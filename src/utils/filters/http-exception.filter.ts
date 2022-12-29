/* eslint-disable prettier/prettier */
import { Response, Request } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, BadRequestException } from '@nestjs/common';

@Catch(BadRequestException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const message: any = exception.getResponse();

    response.status(422).json({
      statusCode: 422,
      message: message.message,
    });
    console.log(request);
  }
}
