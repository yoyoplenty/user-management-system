import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty } from '@nestjs/swagger';
import { Permission } from 'src/permissions/entities/permission.entity';
import { BaseEntity } from 'src/utils/entity/details.entity';

export type RoleDocument = Role & Document;
@Schema({ timestamps: true })
export class Role extends BaseEntity {
  @ApiHideProperty()
  @Prop({ type: Boolean, default: false })
  isActive: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Permission', required: false })
  permissions: Permission[];
}

export const RoleEntity = SchemaFactory.createForClass(Role);
