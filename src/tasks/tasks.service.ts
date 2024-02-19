import { Injectable } from '@nestjs/common';
import { CreateTaskDto, Task } from './tasks.model';
import { Response } from 'express';
export type ResponseType<T> = Response<Partial<T>, Record<string, any>>

@Injectable()
export class TasksService {

  private readonly tasks: Task[] = [];

  findAll(res: Response): ResponseType<Task[]> {
    return res.status(200).send({
      message: 'Task get successfully',
      data: this.tasks
    })
  }

  create(res: Response, task: CreateTaskDto): ResponseType<Task> {
    const newTask = { id: Date.now(), ...task };
    this.tasks.push(newTask);
    return res.status(200).send({
      message: 'Task created successfully',
      data: newTask
    })
  }

  update(res: Response, taskId: number, task: CreateTaskDto): ResponseType<Task> {
    const selectedTaskIndex = this.tasks.findIndex(task => task.id === taskId);
    if (selectedTaskIndex === -1) {
      return res.status(404).send({
        message: 'Task not found',
      })
    }
    const updated = { ...this.tasks[selectedTaskIndex], ...task };
    this.tasks[selectedTaskIndex] = updated;
    return res.status(200).send({
      message: 'Task updated successfully',
      data: updated
    })
  }

  remove(res: Response, taskId: number): ResponseType<Task> {
    const selectedTaskId = this.tasks.findIndex(task => task.id === taskId);
    if (selectedTaskId === -1) {
      return res.status(404).send({
        message: 'Task not found',
      })
    }
    const deletedTask = this.tasks.splice(selectedTaskId, 1);
    return res.status(200).send({
      message: 'Task deleted successfully',
      data: deletedTask[0]
    })
  }
}
