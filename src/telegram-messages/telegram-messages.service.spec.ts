import { Test, TestingModule } from '@nestjs/testing';
import { TelegramMessagesService } from './telegram-messages.service';

describe('TelegramMessagesService', () => {
  let service: TelegramMessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelegramMessagesService],
    }).compile();

    service = module.get<TelegramMessagesService>(TelegramMessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
