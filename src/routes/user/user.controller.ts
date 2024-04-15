import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from 'src/dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  async findAll(@Res() response: Response) {
    try {
      const usersData = await this.userService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'All users data found successfully', data: usersData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get(':id')
  async findOne(@Res() response: Response, @Param('id') id: string) {
    try {
      const existingUser = await this.userService.findUserById(id);
      return response.status(HttpStatus.OK).json({
        message: 'User found successfully', data: existingUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post()
  async create(@Res() response: Response, @Body() createUserData: UserDto) {
    try {
      const newUser = await this.userService.create(createUserData);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        data: newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request'
      });
    }
  }

  @Delete('/:id')
  async delete(@Res() response: Response, @Param('id') userId: string) {
    try {
      const deletedUser = await this.userService.remove(userId);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        data: deletedUser,
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
