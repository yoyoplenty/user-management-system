import { ArgumentMetadata, UnprocessableEntityException, Injectable, PipeTransform } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class SignUpValidationPipe implements PipeTransform {
  constructor(private readonly userService: UsersService) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    const user = await this.userService.findByEmail(value.email);

    if (user) throw new UnprocessableEntityException('email already in use');

    console.log(metadata);
    return value;
  }
}
