/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      name: 'Johan Garcia',
      email: 'johan@santamarias.com',
    },
    {
      id: '2',
      name: 'Angie Gaona',
      email: 'angie@santamarias.com',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const position = this.getUserById(id);
    return this.users[position];
  }

  create(body: CreateUserDto) {
    const newUser = {
      ...body,
      id: `${new Date().getTime()}`,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, changes: UpdateUserDto) {
    const position = this.getUserById(id);
    const currentData = this.users[position];
    const updatedUser = {
      ...currentData,
      ...changes,
    };
    this.users[position] = updatedUser;
    return updatedUser;
  }

  delete(id: string) {
    const position = this.getUserById(id);
    this.users.splice(position, 1);
    return { message: 'User deleted' };
  }

  private getUserById(id: string) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      throw new NotFoundException(`User ${id} Not Found`);
    }
    return position;
  }
}
