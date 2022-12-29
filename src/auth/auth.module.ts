import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PasswordService } from '../utils/services/password.service';
import { UsersModule } from 'src/users/users.module';
import { MailService } from 'src/utils/helpers/mail/mail.service';

@Module({
  imports: [
    UsersModule,
    JwtModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: true, property: 'user' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, PasswordService, JwtStrategy, MailService],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
