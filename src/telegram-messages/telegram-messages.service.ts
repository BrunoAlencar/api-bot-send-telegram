import { Injectable, Logger } from '@nestjs/common';
import { CreateTelegramMessageDto } from './dto/create-telegram-message.dto';
import { PublisherService } from 'src/rabbitmq/publisher.service';
import { ConsumerService } from 'src/rabbitmq/consumer.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class TelegramMessagesService {
  private readonly logger = new Logger(TelegramMessagesService.name);
  private readonly queueName = 'TELEGRAM_MESSAGES';
  constructor(
    private readonly httpService: HttpService,
    private readonly publisherService: PublisherService,
    private readonly consumerService: ConsumerService,
  ) {
    this.consumerService.consume({
      queueName: this.queueName,
      handleMessage: this.sendMessageToTelegram.bind(this),
    });
  }

  async create(createTelegramMessageDto: CreateTelegramMessageDto) {
    const message = {
      ...createTelegramMessageDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await this.publisherService.publishMessage(this.queueName, message);
    return { message: 'Message sent' };
  }

  async sendMessageToTelegram(message: CreateTelegramMessageDto) {
    this.logger.log('sendMessageToTelegram', message);
    await firstValueFrom(
      this.httpService
        .post(
          `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            chat_id: message.chatId,
            text: message.text,
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
  }

  async retryFailedMessages(queueName: string) {
    this.logger.log('Chamou retryFailedMessages', queueName);
    await this.consumerService.consumeDeadLetters(queueName);
    return { message: 'Retry started' };
  }
}
