import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GatewayIntentBits } from 'discord.js';
import { join } from 'path';
import { BotModule } from './bot/bot.module';
import { RedditModule } from './reddit/reddit.module';
import { HealthController } from './health.controller';
import { TggModule } from './tgg/tgg.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'client', 'dist'),
    }),
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('BOT_TOKEN'),
        discordClientOptions: {
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.DirectMessages,
          ],
        },
        registerCommandOptions: [{ removeCommandsBefore: true }],
        failOnLogin: true,
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    BotModule,
    RedditModule,
    TggModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
