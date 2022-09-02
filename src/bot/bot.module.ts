import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedditModule } from '../reddit/reddit.module';
import { BotGateway } from './bot.gateway';

import { HelpCommand } from './commands/help.command';
import { MemeCommand } from './commands/meme.command';
import { TuneInCommand } from './commands/tune-in.command';
import { TuneOutCommand } from './commands/tune-out.command';
import { VoteCommand } from './commands/vote.command';
import { GNRService } from './gnr.service';

@Module({
  imports: [ConfigModule, DiscordModule.forFeature(), RedditModule],
  providers: [
    BotGateway,
    GNRService,
    HelpCommand,
    VoteCommand,
    MemeCommand,
    TuneInCommand,
    TuneOutCommand,
  ],
})
export class BotModule {}
