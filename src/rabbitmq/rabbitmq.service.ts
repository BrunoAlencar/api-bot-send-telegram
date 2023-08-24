import { Injectable } from '@nestjs/common';
import { connect } from 'amqplib';

@Injectable()
export class RabbitmqService {
  async createChannel() {
    const connection = await connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    return channel;
  }
}
