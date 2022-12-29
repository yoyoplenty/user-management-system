import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { OkResponse } from 'src/utils/response/ok';
import { MailBody } from './dtos/mail.dto';
import { MailService } from './mail.service';

@ApiTags('mail')
@Controller('api/v1/mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  @ApiOperation({ summary: 'sends a mail', description: 'to send an email across the platform' })
  @ApiOkResponse({ status: 200, description: 'successful' })
  @ApiBody({ description: 'the required body to succesfully use the api', schema: { examples: { test: 'knanan' } } })
  sendMail(@Body() body: MailBody, @Res() res: Response) {
    this.mailService.send(body.to, body);

    res.status(200).json(new OkResponse(200, 'mail sent successfully'));
  }
}
