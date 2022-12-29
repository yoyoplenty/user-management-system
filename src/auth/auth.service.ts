import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DecodedToken } from './interaface/token.interface';
import { PasswordService } from '../utils/services/password.service';
import { User } from 'src/users/entities/user.entity';
import { MailService } from '../utils/helpers/mail/mail.service';
import { MailType } from '../enums/mail-type.enum';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly mailService: MailService,
  ) {}

  async signUp(newUserData: CreateUserDto): Promise<User | any> {
    try {
      const user = await this.userService.createUser(newUserData);

      await this.mailService.sendMail(MailType.UserCreated, user.email, user);
      return user;
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException('failed to create user', error);
    }
  }

  async confirmUserEmail(id: string) {
    try {
      const user: User = await this.userService.update(String(id), { isActive: true });

      return user;
    } catch (error) {
      throw new UnprocessableEntityException('unable to confirm email', error);
    }
  }

  async signin(user: User) {
    try {
      const accessToken = this.jwtService.sign({ id: user._id }, { secret: process.env.JWT_SECRET_KEY });

      return { accessToken, user };
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException('unable to login', error);
    }
  }

  async forgotPassword(data: User): Promise<void | any> {
    try {
      const resetToken = crypto.randomBytes(16).toString('hex');
      const user = await this.userService.update(String(data._id), { resetToken });

      await this.mailService.sendMail(MailType.ForgotPassword, user.email, { user, resetToken });

      return user;
    } catch (error) {
      throw new UnprocessableEntityException('an error occurred', error);
    }
  }

  async resetPassword(token: string, password: string) {
    try {
      if (!password) throw new UnprocessableEntityException('no password provided');

      const decodedToken: any | DecodedToken = await this.jwtService.decode(token);
      if (!decodedToken) throw new UnprocessableEntityException('invalid or expired token');
      const user: User = await this.userService.findByEmail(decodedToken.email);

      if (decodedToken.resetToken !== user.resetToken) throw new UnprocessableEntityException('incorrect token provided');

      password = await this.passwordService.hashPassword(password);
      return await this.userService.update(String(user._id), {
        password,
        resetToken: '',
      });
    } catch (error) {
      throw new UnprocessableEntityException('incorrect token provided', error);
    }
  }

  async resendMail(email: string) {
    const user: User = await this.userService.findByEmail(email);
    if (user.isActive) throw new UnprocessableEntityException('account already active');

    await this.mailService.sendMail(MailType.UserCreated, user.email, user);
    return user;
  }
}
