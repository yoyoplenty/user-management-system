import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/utils/entity/details.entity';

export class Permission extends BaseEntity {
  @Prop({ type: String, required: true, minlength: 3, maxlength: 255 })
  code: string;
}

export const PermissionEntity = SchemaFactory.createForClass(Permission);
