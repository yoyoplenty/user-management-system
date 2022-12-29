import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class MailBody {
  @MaxLength(50)
  @IsString()
  subject: string;

  @IsString()
  @IsNotEmpty()
  to: string | string[];

  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  body: string;
}
