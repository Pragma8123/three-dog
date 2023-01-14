import { DiscordModule } from '@discord-nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { BotService } from './bot.service';

describe('BotService', () => {
  let service: BotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DiscordModule],
      providers: [
        BotService,
        {
          provide: '__inject_discord_client__',
          useValue: {
            guilds: {
              cache: {
                size: 1,
              },
            },
            users: {
              cache: {
                size: 1,
              },
            },
          },
        },
      ],
    }).compile();

    service = module.get<BotService>(BotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
