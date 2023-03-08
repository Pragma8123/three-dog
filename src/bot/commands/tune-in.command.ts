import { Command, Handler } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { CommandInteraction, GuildMember } from 'discord.js';
import { GNRService } from '../radio/gnr.service';

@Command({
  name: 'tunein',
  description: 'Tune-in to GNR in your current voice channel',
})
@Injectable()
export class TuneInCommand {
  constructor(private readonly gnrService: GNRService) {}

  @Handler()
  async handler(interaction: CommandInteraction): Promise<void> {
    await interaction.deferReply({ ephemeral: true });

    try {
      const member = interaction.member as GuildMember;

      if (!member || !member.voice.channelId) {
        await interaction.editReply(
          "I can't seem to join. Are you in a voice channel?",
        );
        return;
      }

      const channelId = member.voice.channelId;
      const guildId = member.voice.guild.id;
      const adapterCreator = member.guild.voiceAdapterCreator;
      this.gnrService.tuneIn(channelId, guildId, adapterCreator);

      await interaction.editReply({ content: 'Bringing you the news!' });
    } catch (error) {
      await interaction.editReply({
        content: error.toString(),
      });
    }
  }
}
