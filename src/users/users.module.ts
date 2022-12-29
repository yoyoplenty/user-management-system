import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserEntity } from './entities/user.entity';
import { PasswordService } from 'src/utils/services/password.service';
import { AwsService } from 'src/utils/services/aws.service';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          UserEntity.plugin(mongoosePaginate);
          return UserEntity;
        },
      },
    ]),
    NestjsFormDataModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, PasswordService, AwsService],
  exports: [UsersService],
})
export class UsersModule {}
