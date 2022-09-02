import { RedditPost } from './reddit-post.dto';

export class RedditResponse {
  data: {
    children: RedditPost[];
  };
}
