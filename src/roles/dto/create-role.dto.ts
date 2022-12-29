import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsString, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateRoleDto {
  @MinLength(5)
  @MaxLength(100)
  @Matches(/^[a-zA-Z]+$/, { message: 'only alphabets are allowed' })
  @IsNotEmpty()
  name: string;

  @MinLength(5)
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  description: string;

  /**
   * Ids of the permisiions provided
   * @example ['62b7c0fb83bd7653ce1eb613', '62b7c0fb83bd7653ce1eb614']
   */
  @IsMongoId({ each: true })
  @IsArray()
  @IsNotEmpty()
  permissions: string[];
}
