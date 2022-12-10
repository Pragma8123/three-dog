import { Controller, Get } from '@nestjs/common';
import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Get()
  getBotInfo() {
    return {
      guildCount: this.botService.getGuildCount(),
      userCount: this.botService.getUserCount(),
    };
  }
}
