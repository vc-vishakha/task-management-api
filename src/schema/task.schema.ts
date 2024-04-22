import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Prop } from '@nestjs/mongoose/dist/decorators/prop.decorator';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { TaskStatus } from 'src/models/task.model';

@Schema({ timestamps: true, collection: 'task' })
export class Task {
  id: Types.ObjectId;

  @Prop({ type: SchemaTypes.String, required: true, unique: true })
  title: string;

  @Prop({ type: SchemaTypes.String, required: true })
  description: string;

  @Prop({ type: SchemaTypes.String, required: true })
  status: TaskStatus;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
export type TaskDocument = HydratedDocument<Task>;