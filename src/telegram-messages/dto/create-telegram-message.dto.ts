import { ApiProperty } from '@nestjs/swagger';

export class CreateTelegramMessageDto {
  @ApiProperty()
  _id: string;

  @ApiProperty({
    example: '123456789',
  })
  chatId: string;

  @ApiProperty()
  text: string;
}
