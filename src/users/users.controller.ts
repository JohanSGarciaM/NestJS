import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService){}


  validateEmail(email: string) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@”]+(\.[^<>()[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  @Get()
  getUsers(){
    return this.usersService.findAll();
  }


  @Get(':id')
  findUser(@Param('id') id: string){
    return this.usersService.findOne(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDto){
    return this.usersService.create(body);
  }


  @Delete(':id')
  deleteUser(@Param('id') id: string){
    return this.usersService.delete(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() changes: UpdateUserDto) {
    return this.usersService.update(id,changes);
  }
}
