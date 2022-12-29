import { isEmail } from 'class-validator';
import { ArgumentMetadata, UnprocessableEntityException, Injectable, PipeTransform } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class ForgotPasswordPipe implements PipeTransform {
  constructor(private readonly userService: UsersService) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!isEmail(value)) throw new UnprocessableEntityException('invalid email provided');

    const user = await this.userService.findByEmail(value);
    if (!user) throw new UnprocessableEntityException('user email not found');

    console.log(metadata);
    return user;
  }
}
