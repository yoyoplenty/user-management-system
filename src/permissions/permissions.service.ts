import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/utils/services/base.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService extends BaseService<Permission, CreatePermissionDto, UpdatePermissionDto> {
  constructor(@InjectModel(Permission.name) private readonly permissionModel: Model<Permission>) {
    super(permissionModel);
  }
}
