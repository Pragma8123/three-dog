import { Module } from '@nestjs/common';
import { RedditModule } from 'src/reddit/reddit.module';
import { RadioModule } from '../radio/radio.module';
import { HelpCommand } from './help.command';
import { MemeCommand } from './meme.command';
import { TuneInCommand } from './tune-in.command';
import { TuneOutCommand } from './tune-out.command';
import { VoteCommand } from './vote.command';

@Module({
  imports: [RedditModule, RadioModule],
  providers: [
    HelpCommand,
    MemeCommand,
    TuneInCommand,
    TuneOutCommand,
    VoteCommand,
  ],
})
export class CommandsModule {}
