import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RedditPost } from './dto/reddit-post.dto';
import { RedditResponse } from './dto/reddit-response.dto';

@Injectable()
export class RedditService {
  private readonly SUBREDDIT = 'r/FalloutMemes.json';
  private readonly MEDIA_DOMAINS = ['i.redd.it', 'i.imgur.com'];

  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getRandomFalloutMeme(): Promise<RedditPost> {
    // Check our cache first
    let posts: RedditPost[] = await this.cacheManager.get(this.SUBREDDIT);
    if (posts) return posts[Math.floor(Math.random() * posts.length)];

    const response = await this.httpService.axiosRef.get<RedditResponse>(
      this.SUBREDDIT,
      {
        params: {
          sort: 'hot',
          limit: 100,
        },
      },
    );

    posts = this.filterPosts(response.data.data.children);

    this.cacheManager.set(this.SUBREDDIT, posts, 5 * 60 * 1000); // Cache for 5 minutes

    return posts[Math.floor(Math.random() * posts.length)];
  }

  private filterPosts(posts: RedditPost[]) {
    return posts.filter(
      (post) =>
        !post.data.is_video &&
        this.MEDIA_DOMAINS.includes(post.data.domain) &&
        !post.data.over_18 &&
        post.data.score >= 50,
    );
  }
}
