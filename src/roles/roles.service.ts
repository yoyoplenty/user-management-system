import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { BaseService } from 'src/utils/services/base.service';
import { Model } from 'mongoose';

@Injectable()
export class RolesService extends BaseService<Role, CreateRoleDto, UpdateRoleDto> {
  constructor(@InjectModel(Role.name) private readonly roleModel: Model<Role>) {
    super(roleModel);
  }
}
