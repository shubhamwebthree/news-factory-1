import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { title, content, category, image } = await request.json();

    // Fetch the category ID based on the category name
    const categoryRecord = await prisma.category.findUnique({
      where: { name: category },
    });

    if (!categoryRecord) {
      return new Response(JSON.stringify({ error: 'Invalid category' }), { status: 400 });
    }

    // Create the news article
    const news = await prisma.news.create({
      data: {
        title,
        content,
        image,
        categoryId: categoryRecord.id,
      },
    });

    return new Response(JSON.stringify(news), { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
    return new Response(JSON.stringify({ error: 'Failed to create news article' }), { status: 500 });
  }
};
