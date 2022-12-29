import { Response } from 'express';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { OkResponse } from '../utils/response/ok';
import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiBody, ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse, getSchemaPath } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ForgotPasswordPipe } from './validator/forgot-password.validation';
import { UserEmailValidationPipe } from './validator/resend-mail.validation';
import { ConfirmEmailPipe } from './validator/confirm-email.validation';
import { User } from 'src/users/entities/user.entity';
import { UserSignInPipe } from './validator/signin.validation';
import { SignUpValidationPipe } from './validator/signup.validation';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { errorResponseDto } from 'src/utils/dtos/openApi/error-response.dto';

@ApiTags('Auth')
@ApiExtraModels(errorResponseDto)
@ApiUnprocessableEntityResponse({ status: 422, description: 'failed', schema: { $ref: getSchemaPath(errorResponseDto) } })
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Create new User
   */
  @Post('/signup')
  @ApiOkResponse({ status: 201, description: 'user created successfully' })
  async create(@Body(SignUpValidationPipe) newUserData: CreateUserDto, @Res() res: Response) {
    const newUser = await this.authService.signUp(newUserData);

    res.status(201).json(new OkResponse(201, 'Successfully created user', newUser));
  }

  /**
   * Confirm new User email
   */
  @Get('/confirm_mail/:token')
  @ApiOkResponse({ status: 200, description: 'user validated successfully' })
  async verifyEmail(@Param('token', ConfirmEmailPipe) id: string, @Res() res: Response) {
    const verifiedUser = await this.authService.confirmUserEmail(id);

    res.status(200).json(new OkResponse(200, 'Successfully verified user', verifiedUser));
  }

  /**
   * Login User
   */
  @Post('/signin')
  @ApiBody({
    description: 'the payload for login',
    required: true,
    examples: { 'application/json': { value: { email: 'user@gmail.com', password: 'Password1' } } },
  })
  @ApiOkResponse({ status: 200, description: 'user signed in successfully' })
  async signin(@Body(UserSignInPipe) user: User, @Res() res: Response) {
    const signedUser = await this.authService.signin(user);

    res.status(200).json(new OkResponse(200, 'Successfully signed in', signedUser));
  }

  /**
   * Forget password and recieve reset password email
   */
  @Post('/forgot_password')
  @ApiBody({
    description: 'the payload for forgot password',
    required: true,
    examples: { 'application/json': { value: { email: 'user@gmail.com' } } },
  })
  @ApiOkResponse({ description: 'email sent successfuly' })
  async forgotPassword(@Body('email', ForgotPasswordPipe) user: User, @Res() res: Response) {
    await this.authService.forgotPassword(user);

    res.status(200).json(new OkResponse(200, 'email sent successfully'));
  }

  /**
   * Reset password
   */
  @Patch('/reset_password/:token')
  async passwordReset(@Param('token') token: string, @Body() body: UpdateUserDto, @Res() res: Response) {
    const user = await this.authService.resetPassword(token, body.password);

    res.status(200).json(new OkResponse(201, 'reset password successfull', user));
  }

  /**
   * Resend email
   */
  @ApiOperation({ description: 'resend confirmation email if previous one has expired or non-functional', summary: 'request confirmation email' })
  @ApiOkResponse({ description: 'email successfully sent' })
  @Get('/resend_mail/:email')
  async resendMail(@Param('email', UserEmailValidationPipe) email: string, @Res() res: Response) {
    const hmoAndToken = await this.authService.resendMail(email);

    res.status(200).json(new OkResponse(200, 'confirm email sent successfully', hmoAndToken));
  }
}
