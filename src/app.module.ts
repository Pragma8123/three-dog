import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GatewayIntentBits } from 'discord.js';
import { join } from 'path';
import { BotModule } from './bot/bot.module';
import { RedditModule } from './reddit/reddit.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'client', 'dist'),
    }),
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        token: configService.get('BOT_TOKEN'),
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
    BotModule,
    RedditModule,
  ],
})
export class AppModule {}
