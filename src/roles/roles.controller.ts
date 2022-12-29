import { Response } from 'express';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, Res, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { HttpExceptionFilter } from 'src/utils/filters/http-exception.filter';
import { CreateRolePipe } from './validators/create-role.validator';
import { Role } from './entities/role.entity';
import { OkResponse } from 'src/utils/response/ok';
import { RoleIdPipe } from './validators/param.validator';
import { ApiTags } from '@nestjs/swagger';

@UseFilters(new HttpExceptionFilter())
@ApiTags('Roles')
@Controller('api/v1/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  ///TODO provide the description
  @Post()
  async create(@Body(CreateRolePipe) body: CreateRoleDto, @Res() res: Response) {
    const role: Role = await this.rolesService.create(body);

    res.status(201).json(new OkResponse(201, 'role created successfully', role));
  }

  @Get()
  async findAll(@Query() query, @Res() res: Response) {
    const data: Role[] = await this.rolesService.getAll();

    res.status(200).json(new OkResponse(200, 'fetch role successful', data));
  }

  @Get(':id')
  async findOne(@Param('id', RoleIdPipe) id: string, @Res() res: Response) {
    const data: Role = await this.rolesService.getById(id);

    res.status(200).json(new OkResponse(200, 'success', data));
  }

  @Patch(':id')
  async update(@Param('id', RoleIdPipe) id: string, @Body() body: UpdateRoleDto, @Res() res: Response) {
    const data: Role = await this.rolesService.update(id, body);

    res.status(200).json(new OkResponse(200, 'success', data));
  }

  @Delete(':id')
  async remove(@Param('id', RoleIdPipe) id: string, @Res() res: Response) {
    await this.rolesService.delete(id);

    res.status(200).json(new OkResponse(200, 'role deleted successfully'));
  }
}
