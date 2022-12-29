import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import mongoose from 'mongoose';
import { PermissionsService } from '../permissions.service';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class PermissionIdPipe implements PipeTransform {
  constructor(private readonly permissionService: PermissionsService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (!mongoose.Types.ObjectId.isValid(value)) throw new UnprocessableEntityException('invalid id provided');

    console.log(metadata);

    const permission: Permission = await this.permissionService.getById(value);
    if (permission) throw new UnprocessableEntityException('permission with provided id does not exist');
    return value;
  }
}
