import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    console.log('Received data:', data);

    const { content, userEmail, newsId } = data;

    if (!content || !newsId) {
      return new Response('Missing required fields', { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        userEmail: userEmail || null,
        newsId: parseInt(newsId, 10),
      },
    });

    return new Response(JSON.stringify(comment), { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return new Response('Error creating comment', { status: 500 });
  }
};
