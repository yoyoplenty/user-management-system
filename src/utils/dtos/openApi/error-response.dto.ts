import { ApiProperty } from '@nestjs/swagger';

export class errorResponseDto {
  @ApiProperty({
    type: Number,
    example: 422,
    description: 'The error response gotten',
  })
  status: number;

  @ApiProperty({
    type: String,
    example: 'failed',
    description: 'The description of the error message gotten',
  })
  message: string;
}
