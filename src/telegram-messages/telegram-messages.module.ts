import { Module } from '@nestjs/common';
import { TelegramMessagesService } from './telegram-messages.service';
import { TelegramMessagesController } from './telegram-messages.controller';
import { RabbitmqModule } from 'src/rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitmqModule],
  controllers: [TelegramMessagesController],
  providers: [TelegramMessagesService],
})
export class TelegramMessagesModule {}
