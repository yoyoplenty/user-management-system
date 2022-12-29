import mongoose, { Document } from 'mongoose';
import { Factory } from 'nestjs-seeder';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/roles/entities/role.entity';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: mongoose.Schema.Types.ObjectId;
  @Prop({ type: String, length: 100, required: true })
  firstName: string;

  @Prop({ type: String, length: 200, required: true })
  lastName: string;

  @Prop({ type: String, length: 11, required: true })
  phoneNumber: string;

  @Factory('trust@mailinator.com')
  @Prop({ type: String, unique: true, required: true, lowercase: true })
  email: string;

  @Prop({ type: String, length: 100 })
  img_url: string;

  @Factory('Password1')
  @Prop({ type: String })
  password: string;

  @Factory(1)
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role: Role;

  @Factory(true)
  @Prop({ type: Boolean, default: false })
  isActive: boolean;

  @Prop({ type: String })
  resetToken: string;

  @Prop({ type: String })
  confirmToken: string;
}

export const UserEntity = SchemaFactory.createForClass(User);
