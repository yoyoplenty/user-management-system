import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { User } from 'src/users/entities/user.entity';
import { iLoginDetails } from '../interaface/login-details.interface';
import { PasswordService } from '../../utils/services/password.service';

@Injectable()
export class UserSignInPipe implements PipeTransform {
  constructor(private readonly userService: UsersService, private readonly passwordService: PasswordService) {}
  async transform(value: iLoginDetails, metadata: ArgumentMetadata) {
    const user: User = await this.userService.findByEmail(value.email);

    if (!user) throw new UnprocessableEntityException('invalid login details');
    if (!user.isActive) throw new UnprocessableEntityException('this account is not active');

    await this.passwordService.checkPassword(value.password, user.password);

    console.log(metadata);
    return user;
  }
}
