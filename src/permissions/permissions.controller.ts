import { Response } from 'express';
import { OkResponse } from 'src/utils/response/ok';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, Res, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { HttpExceptionFilter } from 'src/utils/filters/http-exception.filter';
import { Permission } from './entities/permission.entity';
import { PermissionIdPipe } from './validators/param.validation';
import { ApiTags } from '@nestjs/swagger';
import { CreatePermissionPipe } from './validators/create-permission.validator';

@UseFilters(new HttpExceptionFilter())
@ApiTags('Permissions')
@Controller('api/v1/permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  /**
   * Create new Permissions
   */
  @Post()
  async create(@Body(CreatePermissionPipe) createPermissionData: CreatePermissionDto, @Res() res: Response) {
    const permission: Permission = await this.permissionsService.create(createPermissionData);

    res.status(201).json(new OkResponse(201, 'permission created successfully', permission));
  }

  /**
   * Get All Permissions
   */
  @Get()
  async findAll(@Query() query, @Res() res: Response) {
    const data = await this.permissionsService.getAll();

    res.status(200).json(new OkResponse(200, 'fetch permission successful', data));
  }

  /**
   * Get A Single Permission By Id
   */
  @Get(':id')
  async findOne(@Param('id', PermissionIdPipe) id: string, @Res() res: Response) {
    const data: Permission = await this.permissionsService.getById(id);

    res.status(200).json(new OkResponse(200, 'successfully fetched data', data));
  }

  /**
   * Get A Single Permission By Id and update the data
   */
  @Patch(':id')
  async update(@Param('id', PermissionIdPipe) id: string, @Body() updatePermissionDto: UpdatePermissionDto, @Res() res: Response) {
    const data: Permission = await this.permissionsService.update(id, updatePermissionDto);

    res.status(200).json(new OkResponse(200, 'successfully updated data', data));
  }

  /**
   * Get A Single Permission By Id and delete the data
   */
  @Delete(':id')
  async remove(@Param('id', PermissionIdPipe) id: string, @Res() res: Response) {
    await this.permissionsService.delete(id);

    res.status(200).json(new OkResponse(200, 'successfully deleted data'));
  }
}
