import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RedditService } from './reddit.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://reddit.com/',
    }),
  ],
  providers: [RedditService],
  exports: [RedditService],
})
export class RedditModule {}
