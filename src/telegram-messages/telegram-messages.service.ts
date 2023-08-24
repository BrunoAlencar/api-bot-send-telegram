import { Injectable } from '@nestjs/common';
import { CreateTelegramMessageDto } from './dto/create-telegram-message.dto';
import { PublisherService } from 'src/rabbitmq/publisher.service';
import { ConsumerService } from 'src/rabbitmq/consumer.service';
// import { UpdateTelegramMessageDto } from './dto/update-telegram-message.dto';

@Injectable()
export class TelegramMessagesService {
  private readonly queueName = 'TELEGRAM_MESSAGES';
  constructor(
    private readonly publisherService: PublisherService,
    private readonly consumerService: ConsumerService,
  ) {
    this.consumerService.consume({
      queueName: this.queueName,
      handleMessage: this.sendMessageToTelegram,
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
    console.log('sendMessageToTelegram', message);
    if (message._id == '2') {
      throw new Error('Esse aqui deu ruim');
    }
    console.log('DEU BOM');
    return;
  }

  async retryFailedMessages(queueName: string) {
    console.log('Chamou retryFailedMessages', queueName);
    await this.consumerService.consumeDeadLetters(queueName);
    return { message: 'Retry started' };
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} telegramMessage`;
  // }

  // update(id: number, updateTelegramMessageDto: UpdateTelegramMessageDto) {
  //   return `This action updates a #${id} telegramMessage`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} telegramMessage`;
  // }
}
