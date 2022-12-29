import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors({
    origin: '*',
    optionsSuccessStatus: 200,
  });

  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false }));

  const options = new DocumentBuilder()
      .setTitle('USER MANAGEMENT SYSTEM')
      .setDescription('The Users Management system documentation')
      .setVersion('1.0')
      .addCookieAuth()
      .addServer('', 'main server')
      .setLicense('MIT', 'http://opensource.org/licenses/MIT')
      .setContact('Yoyoplenty', 'https://yoyoplenty.github.io', 'yoyoplenty@gmail.com')
      .setTermsOfService('terms')
      .addCookieAuth()
      .build(),
    document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document, {
    customSiteTitle: 'User Mangement System Api Documentation',
    swaggerOptions: {},
  });

  await app.listen(process.env.PORT || 5500);
  console.log(`Listening on ${process.env.PORT}`);
}

bootstrap();
