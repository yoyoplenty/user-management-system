import { isEmail } from 'class-validator';
import { ArgumentMetadata, UnprocessableEntityException, Injectable, PipeTransform } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class UserEmailValidationPipe implements PipeTransform {
  constructor(private readonly userService: UsersService) {}
  async transform(value: string, metadata: ArgumentMetadata) {
    if (!isEmail(value)) throw new UnprocessableEntityException('invalid email provided');
    if (value.length > 255) throw new UnprocessableEntityException('maximum number of characters exceeded');

    const user = await this.userService.findByEmail(value);
    if (!user) throw new UnprocessableEntityException('user email not found');

    console.log(metadata);
    return value;
  }
}
