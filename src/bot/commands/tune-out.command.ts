import { Command, DiscordCommand } from '@discord-nestjs/core';
import { Logger } from '@nestjs/common';
import { CommandInteraction } from 'discord.js';
import { GNRService } from '../radio/gnr.service';

@Command({
  name: 'tuneout',
  description: 'Tune out of GNR',
})
export class TuneOutCommand implements DiscordCommand {
  private readonly logger = new Logger(TuneOutCommand.name);

  constructor(private readonly gnrService: GNRService) {}

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
