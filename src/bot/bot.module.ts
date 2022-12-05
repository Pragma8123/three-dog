import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotGateway } from './bot.gateway';
import { CommandsModule } from './commands/commands.module';
import { RadioModule } from './radio/radio.module';

@Module({
  imports: [
    ConfigModule,
    DiscordModule.forFeature(),
    CommandsModule,
    RadioModule,
  ],
  providers: [BotGateway],
})
export class BotModule {}
