import {
  Body, Controller, DefaultValuePipe, Delete,
  Get, HttpStatus, Param, Post, Put, Query, Res
} from '@nestjs/common';
import { Response } from 'express';
import { TasksService } from './tasks.service';
import { TaskDto, UpdateTaskDto } from 'src/dtos/task.dto';
import { TaskStatus } from 'src/models/task.model';
import { AuthorizationException } from 'src/services/authorization.exception';

@Controller('task')
export class TasksController {
  constructor(private taskService: TasksService) { }

  @Get()
  async findAll(@Res() response: Response) {
    try {
      const taskDetails = await this.taskService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'All tasks data found successfully', data: taskDetails,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/filter')
  async findByStatus(
    @Res() response: Response,
    @Query('status', new DefaultValuePipe(TaskStatus.OPEN)) status: TaskStatus,
  ) {
    try {
      const taskList = await this.taskService.findTaskByStatus(status);
      return response.status(HttpStatus.OK).json({
        message: `List of ${status} Tasks found successfully`, data: taskList,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get(':id')
  async findOne(@Res() response: Response, @Param('id') id: string) {
    try {
      const existingTask = await this.taskService.findTaskById(id);
      return response.status(HttpStatus.OK).json({
        message: 'Task found successfully', data: existingTask,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post()
  async create(@Res() response: Response, @Body() createTaskDto: TaskDto) {
    try {
      const newTask = await this.taskService.create(createTaskDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Task has been created successfully',
        data: newTask,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Task not created!',
        error: 'Bad Request'
      });
    }
  }

  // @TODO: Add AuthorizationException in auth module
  @Post('/public')
  async getPublicTask(@Res() response: Response, @Body() credentials: any) {
    if(credentials.username === 'admin' && credentials.password === 'admin') {
      return response.status(HttpStatus.OK).json({
        message: 'Public page access',
      });
    } else {
      throw new AuthorizationException('Invalid credentials');
    }
  }

  @Put(':id')
  async update(@Res() response: Response, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      const existingTask = await this.taskService.update(id, updateTaskDto);
      return response.status(HttpStatus.OK).json({
        message: 'Task has been successfully updated',
        data: existingTask,
      });
    } catch (err) {
      return response.status(err.status).json({
        statusCode: err.status,
        message: err.message,
        error: err.response
      });
    }
  }

  @Delete('/:id')
  async delete(@Res() response: Response, @Param('id') taskId: string) {
    try {
      const deletedTask = await this.taskService.remove(taskId);
      return response.status(HttpStatus.OK).json({
        message: 'Task deleted successfully',
        data: deletedTask,
      });
    } catch (err) {
      return response.status(err.status).json({
        statusCode: err.status,
        message: err.message,
        error: err.name
      });
    }
  }
}
