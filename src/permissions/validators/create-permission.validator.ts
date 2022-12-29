import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import { Permission } from '../entities/permission.entity';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { PermissionsService } from '../permissions.service';

@Injectable()
export class CreatePermissionPipe implements PipeTransform {
  constructor(private readonly permissionService: PermissionsService) {}

  async transform(value: CreatePermissionDto, metadata: ArgumentMetadata) {
    const permission: Permission = await this.permissionService.getByNameOrCode(value.name.trim());
    if (permission) throw new UnprocessableEntityException('Permission with name already exist');

    console.log(metadata);
    return value;
  }
}
