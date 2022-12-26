import { Test, TestingModule } from '@nestjs/testing';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { GNRService } from './radio/gnr.service';

describe('BotController', () => {
  let controller: BotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BotController],
      providers: [BotService, GNRService],
    })
      .overrideProvider(BotService)
      .useValue({
        getGuildCount: jest.fn(() => 1),
        getUserCount: jest.fn(() => 1),
      })
      .overrideProvider(GNRService)
      .useValue({
        getTotalConnections: jest.fn(() => 1),
      })
      .compile();

    controller = module.get<BotController>(BotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getBotInfo', () => {
    it('should return the bot info', () => {
      expect(controller.getBotInfo()).toEqual({
        guildCount: 1,
        userCount: 1,
        listenerCount: 1,
      });
    });
  });
});
