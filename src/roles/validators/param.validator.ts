import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import mongoose from 'mongoose';
import { Role } from '../entities/role.entity';
import { RolesService } from '../roles.service';

@Injectable()
export class RoleIdPipe implements PipeTransform {
  constructor(private readonly roleService: RolesService) {}
  async transform(value: string, metadata: ArgumentMetadata) {
    if (!mongoose.Types.ObjectId.isValid(value)) throw new UnprocessableEntityException('invalid id provided');

    const role: Role = await this.roleService.getById(value);
    if (!role) throw new UnprocessableEntityException('incorrect id provided, role does not exist');

    console.log(metadata);
    return value;
  }
}
