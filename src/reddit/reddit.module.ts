import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { RedditService } from './reddit.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://reddit.com/',
    }),
    CacheModule.register(),
  ],
  providers: [RedditService],
  exports: [RedditService],
})
export class RedditModule {}
