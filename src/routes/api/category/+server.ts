// src/routes/api/categories/+server.ts
import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const GET: RequestHandler = async () => {
  try {
    // Fetch only specified categories
    const categories = await prisma.category.findMany({
      where: {
        name: {
          in: ['World', 'Business', 'India', 'Sports', 'Entertainment', 'Politics']
        }
      }
    });
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return new Response('Error fetching categories', { status: 500 });
  }
};
