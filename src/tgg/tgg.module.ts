import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TggService } from './tgg.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        baseURL: 'https://top.gg/api',
        headers: {
          Authorization: configService.get('TGG_TOKEN'),
          'Content-Type': 'application/json',
        },
      }),
    }),
  ],
  providers: [TggService],
  exports: [TggService],
})
export class TggModule {}
