import { MaxLength, MinLength, IsString, IsNotEmpty, IsOptional, Matches, IsEmail, IsMongoId } from 'class-validator';

export class CreateUserDto {
  @MaxLength(100)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @MaxLength(100)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  lastName: string;

  //TODO example
  @MaxLength(11)
  @MinLength(3)
  @Matches(/[0-9]/)
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @MaxLength(100)
  @MinLength(5)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'password must contain at least one uppercase, one lowercase and one number',
  })
  password: string;

  @IsMongoId()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsOptional()
  resetToken: string;

  @IsString()
  @IsOptional()
  confirmToken: string;
}
