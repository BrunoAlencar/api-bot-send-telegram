import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TelegramMessagesService } from './telegram-messages.service';
import { CreateTelegramMessageDto } from './dto/create-telegram-message.dto';
import { UpdateTelegramMessageDto } from './dto/update-telegram-message.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('telegram-messages')
export class TelegramMessagesController {
  constructor(
    private readonly telegramMessagesService: TelegramMessagesService,
  ) {}

  @Post()
  create(@Body() createTelegramMessageDto: CreateTelegramMessageDto) {
    return this.telegramMessagesService.create(createTelegramMessageDto);
  }

  @Get('retry-failed-messages')
  @ApiQuery({ name: 'queueName', required: true, example: 'TELEGRAM_MESSAGES' })
  retryFailedMessages(@Query('queueName') queueName: string) {
    return this.telegramMessagesService.retryFailedMessages(queueName);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.telegramMessagesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTelegramMessageDto: UpdateTelegramMessageDto,
  // ) {
  //   return this.telegramMessagesService.update(+id, updateTelegramMessageDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.telegramMessagesService.remove(+id);
  // }
}
