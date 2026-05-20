/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entitiy';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOne(id: number) {
    const user = await this.getUserById(id);
    if (user.id === 1) {
      throw new ForbiddenException('You are not allowed to access this user');
    }
    return user;
  }

  async create(body: CreateUserDto) {
    // eslint-disable-next-line no-useless-catch
    try {
      const newUser = await this.usersRepository.save(body);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.getUserById(id);
    const updatedUser = this.usersRepository.merge(user, changes);
    return this.usersRepository.save(updatedUser);
  }

  async delete(id: number) {
    const user = await this.getUserById(id);
    await this.usersRepository.delete(user);
    return { message: 'User deleted' };
  }

  private async getUserById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User ${id} Not Found`);
    }
    return user;
  }
}
