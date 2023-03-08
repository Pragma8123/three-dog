import { Command, Handler } from '@discord-nestjs/core';
import { Injectable, Logger } from '@nestjs/common';
import { CommandInteraction } from 'discord.js';
import { GNRService } from '../radio/gnr.service';

@Command({
  name: 'tuneout',
  description: 'Tune out of GNR',
})
@Injectable()
export class TuneOutCommand {
  private readonly logger = new Logger(TuneOutCommand.name);

  constructor(private readonly gnrService: GNRService) {}

  @Handler()
  async handler(interaction: CommandInteraction): Promise<void> {
    await interaction.deferReply({ ephemeral: true });

    try {
      if (this.gnrService.tuneOut(interaction.guildId)) {
        await interaction.editReply('See you next time!');
      } else {
        await interaction.editReply('You are not tuned in!');
      }
    } catch (error) {
      this.logger.error(error);
      await interaction.editReply(error.toString());
    }
  }
}
