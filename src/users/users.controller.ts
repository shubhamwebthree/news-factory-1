import { Body, Controller, Get, Param, Post, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: { email: string; password: string; walletAddress?: string }) {
    return this.usersService.createUser(body.email, body.password, body.walletAddress);
  }

  @Get()
  async findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  async findUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUserById(id);
  }

  @Put(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: { email?: string; password?: string; walletAddress?: string; token?: string }) {
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
