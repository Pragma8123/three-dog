import { InjectDiscordClient, On, Once } from '@discord-nestjs/core';
import { Injectable, Logger } from '@nestjs/common';
import { Client, Interaction } from 'discord.js';
import { Cron } from '@nestjs/schedule';
import { TggService } from '../tgg/tgg.service';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);

  constructor(
    @InjectDiscordClient() private readonly client: Client,
    private readonly tggService: TggService,
  ) {}

  @Once('ready')
  onReady() {
    this.setActivityStatus('🎙️ On Air! - /help');
    this.logger.log(`Bot ${this.client.user.tag} was started!`);
  }

  @On('interactionCreate')
  onInteractionCreate(interaction: Interaction) {
    if (!interaction.isCommand()) return;
    this.logger.log(
      `Interaction: ${interaction.commandName} from ${interaction.user.tag}`,
    );
  }

  @On('error')
  onError(error: Error) {
    this.logger.error(error);
  }

  @Cron('0 * * * *') // Every hour
  async updateStats() {
    const guildCount = this.client.guilds.cache.size;
    const botId = this.client.user.id;
    try {
      await this.tggService.postStats(botId, guildCount);
      this.logger.log(`Updated stats: ${guildCount} guilds`);
    } catch (error) {
      this.logger.error(`Failed to update stats: ${error}`);
    }
  }

  setActivityStatus(status: string) {
    this.client.user.setActivity({
      name: status,
    });
  }
}
