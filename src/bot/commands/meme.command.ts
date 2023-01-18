import { Command, DiscordCommand } from '@discord-nestjs/core';
import { Logger } from '@nestjs/common';
import { APIEmbed, CommandInteraction, inlineCode } from 'discord.js';
import { RedditPost, RedditService } from '../../reddit/reddit.service';
import { BotConstants } from '../bot.constants';

@Command({
  name: 'meme',
  description: 'Get a fresh Fallout meme',
})
export class MemeCommand implements DiscordCommand {
  private readonly logger = new Logger(MemeCommand.name);

  constructor(private readonly redditService: RedditService) {}

  async handler(interaction: CommandInteraction): Promise<void> {
    await interaction.deferReply();
    try {
      const meme = await this.getRandomFalloutMeme();
      await interaction.editReply({
        embeds: [this.makeEmbed(meme)],
      });
    } catch (error) {
      this.logger.error(error);
      await interaction.editReply('There was an error getting a meme :(');
    }
  }

  async getRandomFalloutMeme(): Promise<RedditPost> {
    const response = await this.redditService.getListing('falloutmemes', {
      sort: 'top',
      time: 'day',
      limit: 50,
    });
    const posts = this.filterPosts(response.data.data.children);
    const post = posts[Math.floor(Math.random() * posts.length)];
    return post;
  }

  makeEmbed(meme: RedditPost): APIEmbed {
    const {
      title,
      link_flair_text,
      permalink,
      url,
      ups,
      num_comments,
      subreddit,
      author,
    } = meme.data;
    return {
      title: title.length > 256 ? `${title.slice(0, 253)}...` : title,
      description: link_flair_text ? inlineCode(link_flair_text) : undefined,
      url: `https://reddit.com${permalink}`,
      image: { url },
      color: BotConstants.COLOR,
      footer: {
        text: `👍 ${ups} | 💬 ${num_comments} | r/${subreddit} | u/${author}`,
      },
    };
  }

  filterPosts(posts: RedditPost[]): RedditPost[] {
    const MEDIA_DOMAINS = ['i.redd.it', 'i.imgur.com', 'i.reddituploads.com'];
    return posts.filter(
      (post) =>
        post.data.is_video === false &&
        post.data.over_18 === false &&
        post.data.spoiler === false &&
        MEDIA_DOMAINS.includes(post.data.domain),
    );
  }
}
