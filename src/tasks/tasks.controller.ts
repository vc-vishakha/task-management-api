import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './tasks.model';
import { Response } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) { }

  @Get()
  findAll(@Res() res: Response) {
    return this.taskService.findAll(res);
  }

  @Get(':id')
  findOne(@Res() res: Response, @Param('id') id: string) {
    return this.taskService.findTaskById(res, Number(id));
  }

  @Post()
  create(@Res() res: Response, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(res, createTaskDto);
  }

  @Put(':id')
  update(@Res() res: Response, @Param('id') id: string, @Body() updateTaskDto: CreateTaskDto) {
    return this.taskService.update(res, Number(id), updateTaskDto);
  }

  @Delete(':id')
  remove(@Res() res: Response, @Param('id') id: string) {
    return this.taskService.remove(res, Number(id));
  }

}
