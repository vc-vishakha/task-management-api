import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDto, UpdateTaskDto } from 'src/dtos/task.dto';
import { TaskStatus } from 'src/models/task.model';
import { Task, TaskDocument } from 'src/schema/task.schema';

@Injectable()
export class TasksService {

  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) { }

  async findAll() {
    const taskList = await this.taskModel.find();
    return taskList ?? [];
  }

  async findTaskById(taskId: string) {
    const existingTask = await this.taskModel.findById(taskId).exec();
    if (!existingTask) {
      throw new NotFoundException(`Task #${taskId} not found`);
    }
    return existingTask;
  }

  async create(task: TaskDto) {
    const newTaskPayload = { ...task, title: task.title?.trim() };
    const newTask = await this.taskModel.create(newTaskPayload);
    return newTask;
  }

  async update(taskId: string, task: UpdateTaskDto) {
    const existingTask = await this.taskModel.findByIdAndUpdate(taskId, task, { new: true });
    if (!existingTask) {
      throw new NotFoundException(`Task not found`);
    }
    return existingTask;
  }

  async remove(taskId: string) {
    const selectedTaskId = await this.taskModel.findByIdAndDelete(taskId);
    if (!selectedTaskId) {
      throw new NotFoundException(`Task not found`);
    }
    return selectedTaskId;
  }

  async findTaskByStatus(taskStatus: TaskStatus) {
    const existingTask = await this.taskModel.find({ status: taskStatus });
    if (!existingTask) {
      throw new NotFoundException(`No tasks in ${taskStatus} state`);
    }
    return existingTask;
  }
}
