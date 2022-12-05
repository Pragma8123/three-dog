import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { GNRService } from './gnr.service';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [GNRService],
  exports: [GNRService],
})
export class RadioModule {}
