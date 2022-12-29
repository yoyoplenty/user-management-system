import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { Permission, PermissionEntity } from './entities/permission.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Permission.name,
        useFactory: () => {
          PermissionEntity.plugin(mongoosePaginate);
          return PermissionEntity;
        },
      },
    ]),
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
