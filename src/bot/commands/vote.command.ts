import { Command, DiscordCommand } from '@discord-nestjs/core';
import { CommandInteraction } from 'discord.js';

@Command({
  name: 'vote',
  description: 'Get a link to vote for the bot on Top.gg',
})
export class VoteCommand implements DiscordCommand {
  async handler(interaction: CommandInteraction): Promise<void> {
    await interaction.reply({
      ephemeral: true,
      content: `Thanks for voting, ${interaction.member.user.username}!\nhttps://top.gg/bot/461602422192734228/vote`,
    });
  }
}
