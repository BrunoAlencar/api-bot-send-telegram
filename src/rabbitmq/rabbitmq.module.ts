import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { RabbitmqController } from './rabbitmq.controller';
import { PublisherService } from './publisher.service';
import { ConsumerService } from './consumer.service';

@Module({
  controllers: [RabbitmqController],
  providers: [RabbitmqService, PublisherService, ConsumerService],
  exports: [RabbitmqService, PublisherService, ConsumerService],
})
export class RabbitmqModule {}
