import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module'; // Adjust the import based on your project structure
import { PrismaService } from './prisma.service';

@Module({
  imports: [UsersModule],
  providers: [PrismaService],
})
export class AppModule {}
