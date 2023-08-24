import { ApiProperty } from '@nestjs/swagger';

export class CreateTelegramMessageDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  chatId: string;

  @ApiProperty()
  text: string;
}
