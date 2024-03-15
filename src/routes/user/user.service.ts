import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dtos/user.dto';
import { User, UserDocument } from 'src/schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) { }

  async findAll() {
    const userList = await this.userModel.find();
    return userList ?? [];
  }

  async findUserById(userId: string) {
    const existingUser = await this.userModel.findById(userId).exec();
    if (!existingUser) {
      throw new NotFoundException(`User not found`);
    }
    return existingUser;
  }

  async create(user: UserDto) {
    const newUser = await this.userModel.create(user);
    return newUser;
  }

  async remove(userId: string) {
    const selectedUserId = await this.userModel.findByIdAndDelete(userId);
    if (!selectedUserId) {
      throw new NotFoundException(`User not found`);
    }
    return selectedUserId;
  }

}
