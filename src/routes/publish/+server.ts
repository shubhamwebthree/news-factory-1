// src/routes/api/news/+server.ts

import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { title, content, category, image, userEmail } = await request.json();

    const news = await prisma.news.create({
      data: {
        title,
        content,
        category,
        image,
      },
    });

    return new Response(JSON.stringify(news), { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
    return new Response('Error creating news', { status: 500 });
  }
};
