import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import { PermissionsService } from 'src/permissions/permissions.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { Role } from '../entities/role.entity';
import { RolesService } from '../roles.service';

@Injectable()
export class CreateRolePipe implements PipeTransform {
  constructor(private readonly roleService: RolesService, private readonly permissionService: PermissionsService) {}

  async transform(value: CreateRoleDto, metadata: ArgumentMetadata) {
    const role: Role = await this.roleService.getByNameOrCode(value.name.trim());
    if (role) throw new UnprocessableEntityException('role with name already exist');

    for (const permission of value.permissions) {
      const data = await this.permissionService.getById(permission);
      if (!data) throw new UnprocessableEntityException(`permission id ${permission} does not exist`);
    }

    console.log(metadata);
    return value;
  }
}
