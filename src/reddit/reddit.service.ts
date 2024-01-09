import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { type Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

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

@Injectable()
export class RedditService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly httpService: HttpService,
  ) {}

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

    res = await firstValueFrom(
      this.httpService.get<ListingResponse>(`r/${subreddit}.json`, {
        params: options,
      }),
    );

    await this.cacheManager.set(subreddit, res);

    return res;
  }
}
