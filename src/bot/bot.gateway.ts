import { InjectDiscordClient, Once } from '@discord-nestjs/core';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'discord.js';
import { AutoPoster } from 'topgg-autoposter';
import { BasePoster } from 'topgg-autoposter/dist/structs/BasePoster';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);

  private autoPoster: BasePoster;

  constructor(
    private configService: ConfigService,
    @InjectDiscordClient() private readonly client: Client,
  ) {}

  @Once('ready')
  onReady() {
    this.logger.log(`Bot ${this.client.user.tag} was started!`);

    this.setActivityStatus('🎙️ On Air! - /help');

    this.setupTggStats();
  }

  setActivityStatus(status: string) {
    this.client.user.setActivity({
      name: status,
    });
  }

  private setupTggStats() {
    const tggToken = this.configService.get('TGG_TOKEN');

    if (tggToken) {
      this.autoPoster = AutoPoster(tggToken, this.client);

      this.autoPoster.on('posted', () =>
        this.logger.log('Top.gg Autoposter: Posted stats to Top.gg!'),
      );

      this.autoPoster.on('error', (error) =>
        this.logger.error(`Top.gg Autoposter: ${error.toString()}`),
      );

      this.logger.log('Top.gg Autoposter started!');
    } else {
      this.logger.log('Top.gg Autoposter not started...');
    }
  }
}
