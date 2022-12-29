import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { HasMimeType, IsFile, MaxFileSize, MemoryStoredFile } from 'nestjs-form-data';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @MaxLength(100)
  @MinLength(10)
  @IsString()
  @IsOptional()
  img_url: string;

  @MaxFileSize(1e6)
  @HasMimeType(['image/jpg', 'image/jpeg', 'image/png'], { message: 'invalid file extension, only jpeg, jpg or png is allowed' })
  @IsFile({ message: 'expected input is a file' })
  @IsOptional()
  file: MemoryStoredFile;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'old password must contain at least one uppercase, one lowercase and one number',
  })
  oldPassword: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'new password must contain at least one uppercase, one lowercase and one number',
  })
  newPassword: string;
}
