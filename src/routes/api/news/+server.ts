// src/routes/api/news/+server.ts

import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { title, content, image } = await request.json();

    const news = await prisma.news.create({
      data: {
        title,
        content,
        image,
      },
    });

    return new Response(JSON.stringify(news), { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
    return new Response('Error creating news', { status: 500 });
  }
};

export const GET: RequestHandler = async () => {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        createdAt: 'desc', // Assuming you have a createdAt field in your schema
      },
    });

    return new Response(JSON.stringify(news), { status: 200 });
  } catch (error) {
    console.error('Error fetching news:', error);
    return new Response('Error fetching news', { status: 500 });
  }
};
