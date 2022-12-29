import { JwtService } from '@nestjs/jwt';
import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { DecodedToken } from '../interaface/token.interface';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ConfirmEmailPipe implements PipeTransform {
  constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {}
  async transform(value: string, metadata: ArgumentMetadata) {
    const decodedToken: DecodedToken | any = this.jwtService.decode(value);

    if (!decodedToken) throw new UnprocessableEntityException('invalid or expired token');

    const user: User = await this.userService.findByEmail(decodedToken.email);
    if (!user) throw new UnprocessableEntityException('user not found');
    if (user.isActive) throw new UnprocessableEntityException('user account already active');

    if (decodedToken.confirmToken !== user.confirmToken) throw new UnprocessableEntityException('token does not match');

    console.log(metadata);
    return String(user._id);
  }
}
