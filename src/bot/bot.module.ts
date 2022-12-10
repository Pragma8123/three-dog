import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotGateway } from './bot.gateway';
import { CommandsModule } from './commands/commands.module';
import { RadioModule } from './radio/radio.module';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';

@Module({
  imports: [
    ConfigModule,
    DiscordModule.forFeature(),
    CommandsModule,
    RadioModule,
  ],
  providers: [BotGateway, BotService],
  controllers: [BotController],
})
export class BotModule {}
