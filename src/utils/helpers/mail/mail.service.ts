import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as mg from 'mailgun-js';

const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const mailgun = mg({ apiKey, domain });
@Injectable()
export class MailService {
  constructor(private readonly jwtService: JwtService) {}

  send(to: string | string[], content, from: string = process.env.MAIL_SENDER) {
    const data = {
      from: from,
      to: to, // List of recipients
      subject: content.subject, // Subject line
      html: content.body, //HTML Body
    };

    mailgun.messages().send(data, function (error, body) {
      console.log(body);
      if (!error) return true;

      console.log(error);
      return error;
    });
  }

  async sendMail(mailType: number, to: string | string[], data?: any) {
    const mailContent = await this.generateMail(mailType, data);

    console.log(mailContent);
    this.send(to, mailContent);
  }

  async generateMail(mailType: number, data?: any) {
    switch (mailType) {
      case 1:
        {
          const token = await this.jwtService.sign({ email: data.email, confirmToken: data.confirmToken }, { secret: process.env.JWT_SECRET_KEY });
          return {
            body: `user created http://127.0.0.1:5500/confirm_mail/${token}`,
            subject: 'user created',
          };
        }
        break;
      case 2:
        {
          const { user, resetToken } = data;
          const token = await this.jwtService.sign({ email: user.email, resetToken }, { secret: process.env.JWT_SECRET_KEY });

          return {
            subject: 'forgot password',
            body: `forgot password http://127.0.0.1:5500/reset_password/${token}`,
          };
        }
        break;
      default:
        return null;
    }
  }
}
