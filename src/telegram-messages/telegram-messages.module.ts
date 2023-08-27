import { Module } from '@nestjs/common';
import { TelegramMessagesService } from './telegram-messages.service';
import { TelegramMessagesController } from './telegram-messages.controller';
import { RabbitmqModule } from 'src/rabbitmq/rabbitmq.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    RabbitmqModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [TelegramMessagesController],
  providers: [TelegramMessagesService],
})
export class TelegramMessagesModule {}
