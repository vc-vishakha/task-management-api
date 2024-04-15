import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { TasksService } from './tasks.service';
import { TaskDto, UpdateTaskDto } from 'src/dtos/task.dto';

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
