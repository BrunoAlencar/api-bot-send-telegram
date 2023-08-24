import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TelegramMessagesModule } from './telegram-messages/telegram-messages.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: ['../.env'],
    }),
    RabbitmqModule,
    TelegramMessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
