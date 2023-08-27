import { ApiProperty } from '@nestjs/swagger';

export class CreateTelegramMessageDto {
  @ApiProperty({
    example: '-1001813822603',
  })
  chatId: string;

  @ApiProperty({
    example: 'Alo homoraa!!!!!!! - Alencar',
  })
  text: string;
}
