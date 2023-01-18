import { HttpModule, HttpService } from '@nestjs/axios';
import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { RedditPost, ListingResponse, RedditService } from './reddit.service';

describe('RedditService', () => {
  let service: RedditService;
  let httpService: HttpService;
  let mockResponse: AxiosResponse<ListingResponse>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, CacheModule.register()],
      providers: [RedditService],
    }).compile();

    service = module.get<RedditService>(RedditService);
    httpService = module.get<HttpService>(HttpService);
    mockResponse = {
      data: {
        data: {
          children: [
            {
              data: {
                subreddit: 'javascript',
                title: 'Test Post',
                domain: '',
                permalink: '/r/javascript/comments/123456/test-post',
                link_flair_text: 'Test Flair',
                is_reddit_media_domain: false,
                is_video: false,
                score: 100,
                ups: 100,
                num_comments: 10,
                over_18: false,
                spoiler: false,
                author: 'Test Author',
                url: 'https://localhost:3000',
              },
            },
          ],
        },
      },
      headers: {},
      status: 200,
      statusText: 'OK',
      config: {},
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getSubredditPosts', () => {
    it('should return an array of posts', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(of(mockResponse) as any);

      const posts = await service.getListing('javascript');

      expect(posts.data.data.children).toBeInstanceOf(Array<RedditPost>);
    });
  });
});
