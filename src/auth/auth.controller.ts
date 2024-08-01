import { Body, Controller, Post, Get, Param, Put, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: { email: string; password: string; walletAddress?: string }) {
    return this.authService.registerUser(body.email, body.password, body.walletAddress);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.validateUser(body.email, body.password);
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.authService.getUserById(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() body: { walletAddress?: string; token?: string }) {
    return this.authService.updateUser(id, body.walletAddress, body.token);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.authService.deleteUser(id);
  }
}
