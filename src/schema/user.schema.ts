import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Prop } from '@nestjs/mongoose/dist/decorators/prop.decorator';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'user' })
export class User {
  id: Types.ObjectId;

  @Prop({ type: SchemaTypes.String, required: true, unique: true })
  name: string;

  @Prop({ type: SchemaTypes.String, required: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;