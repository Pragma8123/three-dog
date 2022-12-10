import { InjectDiscordClient } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { Client } from 'discord.js';

@Injectable()
export class BotService {
  constructor(@InjectDiscordClient() private readonly client: Client) {}

  getGuildCount(): number {
    return this.client.guilds.cache.size;
  }

  getUserCount(): number {
    return this.client.users.cache.size;
  }
}
