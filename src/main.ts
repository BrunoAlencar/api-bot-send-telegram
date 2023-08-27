import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from 'console';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    cors: true,
  });
  log(`process.env.PORT: ${process.env.PORT}`);

  const config = new DocumentBuilder()
    .setTitle('Telegram messages')
    .setDescription('The Telegram messager API')
    .setVersion('1.0')
    .addTag('telegram-messages')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
