import { Model } from 'mongoose';
import * as crypto from 'crypto';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AwsService } from 'src/utils/services/aws.service';
import { BaseService } from 'src/utils/services/base.service';
import { PasswordService } from 'src/utils/services/password.service';

@Injectable()
export class UsersService extends BaseService<User, CreateUserDto, UpdateUserDto> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly passwordService: PasswordService,
    private readonly awsService: AwsService, // jwtService: JwtService,
  ) {
    super(userModel);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async createUser(newUserData: CreateUserDto) {
    try {
      const user: User = await this.userModel.findOne({ email: newUserData.email });
      if (user) throw new UnprocessableEntityException('user already exists');

      newUserData.password = newUserData.password
        ? await this.passwordService.hashPassword(newUserData.password)
        : await this.passwordService.hashPassword('Password123');
      newUserData.confirmToken = crypto.randomBytes(16).toString('hex');

      const newUser: User = await this.userModel.create(newUserData);

      return newUser;
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async updateUser(id: string, updateUserData: UpdateUserDto) {
    try {
      const updatedUserData = updateUserData.file ? await this.uploadPicture(id, updateUserData) : await this.setUserPassword(id, updateUserData);

      return await this.userModel.findByIdAndUpdate(id, updatedUserData);
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async setUserPassword(id: string, updateUserData: UpdateUserDto) {
    try {
      const { newPassword, oldPassword } = updateUserData;
      const user: User = await this.userModel.findById(id);

      await this.passwordService.checkPassword(oldPassword, user.password);
      const password = await this.passwordService.hashPassword(newPassword);

      return { password };
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async uploadPicture(id: string, updateUserData: UpdateUserDto) {
    try {
      const user: User = await this.userModel.findById(id);

      const { file } = updateUserData;
      const data = {
        file,
        name: `${user.firstName + user.lastName.replace(' ', '-')}.${file.mimetype.split('/')[1]}`,
      };

      const image = await this.awsService.uploadPublicFile(data);
      updateUserData.img_url = image.Location;

      return updateUserData;
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}
