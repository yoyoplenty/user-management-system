import { Request, Response } from 'express';
import { FormDataRequest } from 'nestjs-form-data';
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse, getSchemaPath } from '@nestjs/swagger';
import { Controller, Get, Param, Delete, UseFilters, Req, Res, Patch, Body, UseGuards, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { OkResponse } from 'src/utils/response/ok';
import { UserParamPipe } from './validator/param.validation';
import { RequestUser } from 'src/utils/interfaces/type.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth';
import { errorResponseDto } from 'src/utils/dtos/openApi/error-response.dto';
import { HttpExceptionFilter } from 'src/utils/filters/http-exception.filter';
import { User } from './entities/user.entity';

@ApiTags('Users')
@ApiBearerAuth()
@ApiExtraModels(errorResponseDto)
@ApiUnprocessableEntityResponse({ status: 422, description: 'failed', schema: { $ref: getSchemaPath(errorResponseDto) } })
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * This routes tech all users account
   */
  @Get()
  @UseFilters(new HttpExceptionFilter())
  @ApiOkResponse({ status: 200, description: 'users fetched successfully', type: [User] })
  async findAll(@Req() req: Request, @Res() res: Response) {
    const allUsers = await this.usersService.getAll();

    res.status(200).json(new OkResponse(200, 'Successfully fetched data', allUsers));
  }

  /**
   *This gets a single user by id
   */
  @Get(':id')
  @UseFilters(new HttpExceptionFilter())
  @ApiOkResponse({ status: 200, description: 'users fetched successfully', type: User })
  async findOne(@Param('id', UserParamPipe) id: string, @Req() req: Request, @Res() res: Response) {
    const user = await this.usersService.getById(id);

    res.status(200).json(new OkResponse(200, 'Successfully fetched data', user));
  }

  /**
   *This routes update a user personal details and also allows user to upload a profile image
   and change their profile password
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseFilters(new HttpExceptionFilter())
  @FormDataRequest()
  @ApiOkResponse({ status: 200, description: 'user updated successfully', schema: { $ref: getSchemaPath(User) } })
  async update(@Param('id', UserParamPipe) id: string, @Body() updateUserDto: UpdateUserDto, @Req() req: RequestUser, @Res() res: Response) {
    if (id !== String(req.user._id)) throw new UnauthorizedException('you are not authorized to do this');

    const updatedUser =
      updateUserDto.file || updateUserDto.newPassword
        ? await this.usersService.updateUser(id, updateUserDto)
        : await this.usersService.update(id, updateUserDto);

    res.status(201).json(new OkResponse(201, 'Successfully updated data', updatedUser));
  }

  /**
   *This delets a sigle user by id
   */
  @Delete(':id')
  @ApiOkResponse({ status: 200, description: 'user deleted successfully', type: User })
  async remove(@Param('id', UserParamPipe) id: string, @Res() res: Response) {
    await this.usersService.delete(id);

    res.status(200).json(new OkResponse(201, 'Successfully deleted data'));
  }
}
