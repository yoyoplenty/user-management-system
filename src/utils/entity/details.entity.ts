import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class BaseEntity {
  /**
   * Name of the entity provided
   * @example Dane
   */
  @Prop({ type: String, required: true })
  name: string;

  /**
   * description of the entity provided
   * @example
   */
  @Prop({ type: String, required: true })
  description: string;
}
