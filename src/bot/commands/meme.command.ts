import { Command, DiscordCommand } from '@discord-nestjs/core';
import { CommandInteraction } from 'discord.js';
import { RedditService } from '../../reddit/reddit.service';
import { BotConstants } from '../bot.constants';

@Command({
  name: 'meme',
  description: 'Get a fresh Fallout meme',
})
export class MemeCommand implements DiscordCommand {
  constructor(private readonly redditService: RedditService) {}

  async handler(interaction: CommandInteraction): Promise<void> {
    await interaction.deferReply();

    const post = (await this.redditService.getRandomFalloutMeme()).data;

    const title =
      post.title.length > 256 ? `${post.title.slice(0, 253)}...` : post.title;

    const flair = post.link_flair_text
      ? `\`${post.link_flair_text}\``
      : undefined;

    await interaction.editReply({
      embeds: [
        {
          title,
          description: flair,
          url: `https://reddit.com${post.permalink}`,
          image: { url: post.url },
          color: BotConstants.COLOR,
          footer: {
            text: `👍 ${post.ups} | 💬 ${post.num_comments} | ${post.subreddit_name_prefixed} | u/${post.author}`,
          },
        },
      ],
    });
  }
}
