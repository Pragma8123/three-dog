import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
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
  constructor(private readonly httpService: HttpService) {}

  getListing(
    subreddit: string,
    options?: ListingOptions,
  ): Promise<AxiosResponse<ListingResponse>> {
    return firstValueFrom(
      this.httpService.get<ListingResponse>(`r/${subreddit}.json`, {
        params: options,
      }),
    );
  }
}
