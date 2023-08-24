// publisher.service.ts
import { Injectable } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';

@Injectable()
export class PublisherService {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  async publishMessage(queueName: string, message: any) {
    const channel = await this.rabbitmqService.createChannel();

    await channel.assertQueue(queueName);

    await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  }
}
