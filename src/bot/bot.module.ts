import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';

import { HelpCommand } from './commands/help.command';
import { VoteCommand } from './commands/vote.command';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [HelpCommand, VoteCommand],
})
export class BotModule {}
