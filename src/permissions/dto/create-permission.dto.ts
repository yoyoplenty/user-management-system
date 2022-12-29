import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePermissionDto {
  @MaxLength(100)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(100)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  code: string;

  @MaxLength(100)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  description: string;
}
