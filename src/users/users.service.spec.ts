import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // Adjust the import based on your project structure
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(email: string, password: string, walletAddress?: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.prisma.user.create({
        data: { email, password: hashedPassword, walletAddress },
      });
      return user;
    } catch (error) {
      if (error.code === 'P2002') { // Unique constraint violation
        throw new ConflictException('User with this email or wallet address already exists');
      }
      throw error;
    }
  }

  async findAllUsers(): Promise<any[]> {
    return this.prisma.user.findMany();
  }

  async findUserById(id: number): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(id: number, data: Partial<{ email: string, password: string, walletAddress: string, token: string }>): Promise<any> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    return user;
  }

  async deleteUser(id: number): Promise<any> {
    const user = await this.prisma.user.delete({ where: { id } });
    return user;
  }
}
