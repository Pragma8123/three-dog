import { Test, TestingModule } from '@nestjs/testing';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';

describe('BotController', () => {
  let controller: BotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BotController],
      providers: [BotService],
    })
      .overrideProvider(BotService)
      .useValue({
        getGuildCount: jest.fn(() => 1),
        getUserCount: jest.fn(() => 1),
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
      });
    });
  });
});
