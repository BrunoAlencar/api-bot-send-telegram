import { Test, TestingModule } from '@nestjs/testing';
import { TelegramMessagesController } from './telegram-messages.controller';
import { TelegramMessagesService } from './telegram-messages.service';

describe('TelegramMessagesController', () => {
  let controller: TelegramMessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelegramMessagesController],
      providers: [TelegramMessagesService],
    }).compile();

    controller = module.get<TelegramMessagesController>(
      TelegramMessagesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
