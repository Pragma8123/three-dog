import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { RedditService } from './reddit.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      baseURL: 'https://oauth.reddit.com/',
    }),
    CacheModule.register(),
  ],
  providers: [RedditService],
  exports: [RedditService],
})
export class RedditModule {}
