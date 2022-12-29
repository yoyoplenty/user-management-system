import mongoose from 'mongoose';
import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common';

import { UsersService } from '../users.service';

@Injectable()
export class UserParamPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}

  async transform(value: string, metadata: ArgumentMetadata) {
    if (!mongoose.Types.ObjectId.isValid(String(value))) throw new UnprocessableEntityException('invalid id provided');
    const user = await this.usersService.getById(String(value));

    if (!user) throw new UnprocessableEntityException(`user does not exist`);

    console.log(metadata);
    return value;
  }
}
