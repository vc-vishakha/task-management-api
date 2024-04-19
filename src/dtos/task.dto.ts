import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TaskStatus } from 'src/models/task.model';

export class TaskDto {

  @Transform(({ value }): string => (value as string)?.trim())
  @IsString()
  @MinLength(5, { message: 'Task title should be of minimum 5 characters' })
  @MaxLength(100, { message: 'Task title should be of maximum 100 characters' })
  @Matches(/^[a-zA-Z_ ]*$/, { message: 'Task title should only contain alphabets' })
  @IsNotEmpty({ message: `Task title should not be empty` })
  title: string;

  @Transform(({ value }): string => (value as string)?.trim())
  @IsString()
  @MinLength(10, { message: 'Task description should be of minimum 10 characters' })
  @MaxLength(250, { message: 'Task description should be of maximum 250 characters' })
  @Matches(/^[a-zA-Z0-9_ ]*$/, { message: 'Task description should only contain alphanumeric characters' })
  @IsNotEmpty({ message: `Task description should not be empty` })
  description: string;

  @IsEnum(TaskStatus, { message: `Task status should be [${Object.keys(TaskStatus).toString().split(',').join(' OR ')}]` })
  status: string;
}

import { PartialType } from '@nestjs/mapped-types';
export class UpdateTaskDto extends PartialType(TaskDto) { }

