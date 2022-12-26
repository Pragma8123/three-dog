import { Controller, Get } from '@nestjs/common';
import { BotService } from './bot.service';
import { GNRService } from './radio/gnr.service';

@Controller('bot')
export class BotController {
  constructor(
    private readonly botService: BotService,
    private readonly gnrService: GNRService,
  ) {}

  @Get()
  getBotInfo() {
    return {
      guildCount: this.botService.getGuildCount(),
      userCount: this.botService.getUserCount(),
      listenerCount: this.gnrService.getTotalConnections(),
    };
  }
}
