import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { type Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

export type RedditPost = {
  data: {
    subreddit: string;
    title: string;
    permalink: string;
    link_flair_text: string;
    is_reddit_media_domain: boolean;
    domain: string;
    is_video: boolean;
    score: number;
    ups: number;
    num_comments: number;
    over_18: boolean;
    spoiler: boolean;
    author: string;
    url: string;
  };
};

export type ListingResponse = {
  data: {
    children: RedditPost[];
  };
};

export type ListingOptions = {
  sort?: 'hot' | 'new' | 'top';
  time?: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
  limit?: number;
};

export type AccessTokenResponse = {
  access_token: string;
};

@Injectable()
export class RedditService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getAccessToken() {
    const form = new FormData();
    form.append('grant_type', 'client_credentials');
    const res = await firstValueFrom(
      this.httpService.post<AccessTokenResponse>(
        'https://www.reddit.com/api/v1/access_token',
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          auth: {
            username: this.configService.get<string>('REDDIT_OAUTH_CLIENT_ID'),
            password: this.configService.get<string>(
              'REDDIT_OAUTH_CLIENT_SECRET',
            ),
          },
        },
      ),
    );

    return res.data.access_token;
  }

  async getListing(
    subreddit: string,
    options?: ListingOptions,
  ): Promise<AxiosResponse<ListingResponse>> {
    let res = await this.cacheManager.get<AxiosResponse<ListingResponse>>(
      subreddit,
    );

    if (res) {
      return res;
    }

    const accessToken = await this.getAccessToken();

    res = await firstValueFrom(
      this.httpService.get<ListingResponse>(`r/${subreddit}`, {
        params: options,
        headers: {
          Authorization: `bearer ${accessToken}`,
        },
      }),
    );

    await this.cacheManager.set(subreddit, res);

    return res;
  }
}
