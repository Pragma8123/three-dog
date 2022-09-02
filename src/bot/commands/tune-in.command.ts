import { Command, DiscordCommand } from '@discord-nestjs/core';
import { CommandInteraction, GuildMember } from 'discord.js';
import { GNRService } from '../gnr.service';

@Command({
  name: 'tunein',
  description: 'Tune-in to GNR in your current voice channel',
})
export class TuneInCommand implements DiscordCommand {
  constructor(private readonly gnrService: GNRService) {}

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

      console.log(`member.voice.channelId = ${member.voice.channelId}`);

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
