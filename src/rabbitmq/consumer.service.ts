// publisher.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { ConsumeMessageDTO } from './dto/consume-message.dto';

@Injectable()
export class ConsumerService {
  constructor(private readonly rabbitmqService: RabbitmqService) {}
  private readonly logger = new Logger(ConsumerService.name);
  async consume({ queueName, handleMessage }: ConsumeMessageDTO) {
    const channel = await this.rabbitmqService.createChannel();

    await channel.assertQueue(queueName);

    channel.consume(queueName, async (message) => {
      try {
        await handleMessage(JSON.parse(message.content.toString()));
        channel.ack(message);
      } catch (error) {
        this.logger.error(`ConsumerService.consume.${queueName}`, error);
        const QUEUE_DEAD_LETTER = `${queueName}_DEAD_LETTER`;
        this.logger.error(`Message will be send to ${QUEUE_DEAD_LETTER}`);
        await channel.assertQueue(QUEUE_DEAD_LETTER);
        await channel.sendToQueue(QUEUE_DEAD_LETTER, message.content);
        channel.ack(message);
      }
    });
  }

  async consumeDeadLetters(queueName: string) {
    const channel = await this.rabbitmqService.createChannel();

    const QUEUE_DEAD_LETTER = `${queueName}_DEAD_LETTER`;
    await channel.assertQueue(QUEUE_DEAD_LETTER);
    channel.consume(QUEUE_DEAD_LETTER, async (message) => {
      try {
        // await handleMessage(JSON.parse(message.content.toString()));
        this.logger.log(`consumeDeadLetters started ${QUEUE_DEAD_LETTER}`);
        await channel.assertQueue(queueName);
        await channel.sendToQueue(queueName, message.content);
        channel.ack(message);
        const queueCheck = await channel.checkQueue(QUEUE_DEAD_LETTER);
        if (queueCheck.messageCount == 0) {
          this.logger.log(`consumeDeadLetters finished ${QUEUE_DEAD_LETTER}`);
          await channel.close();
        }
      } catch (error) {
        this.logger.error(
          `ConsumerService.consumeDeadLetters.${queueName}`,
          error.message,
        );
        this.logger.error(
          `ERR:ConsumerService.consumeDeadLetters.${QUEUE_DEAD_LETTER}`,
          JSON.parse(message.content.toString()),
        );
      }
    });
  }
}
