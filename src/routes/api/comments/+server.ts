// src/routes/api/comments/+server.ts
import { PrismaClient } from "@prisma/client";
import type { RequestHandler } from "@sveltejs/kit";

const prisma = new PrismaClient();

// Create a new comment
export const POST: RequestHandler = async ({ request }) => {
  try {
    const { content, newsArticleId } = await request.json();
    console.log('Creating comment for news article:', newsArticleId);

    const commentRecord = await prisma.comment.create({
      data: {
        content,
        newsArticleId,
      },
    });

    console.log('Comment created successfully:', commentRecord);
    return new Response(JSON.stringify(commentRecord), { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return new Response(JSON.stringify({ error: 'Error creating comment' }), { status: 500 });
  }
};

// Fetch comments for a specific news article
export const GET: RequestHandler = async ({ url }) => {
  try {
    const newsArticleId = parseInt(url.searchParams.get('newsArticleId'), 10);
    if (isNaN(newsArticleId)) {
      return new Response(JSON.stringify({ error: 'Invalid or missing newsArticleId' }), { status: 400 });
    }

    console.log('Fetching comments for news article:', newsArticleId);

    const comments = await prisma.comment.findMany({
      where: { newsArticleId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log('Comments fetched successfully:', comments);
    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return new Response(JSON.stringify({ error: 'Error fetching comments' }), { status: 500 });
  }
};

// Delete a specific comment by its ID
export const DELETE: RequestHandler = async ({ url }) => {
  try {
    const commentId = parseInt(url.searchParams.get('id'), 10);
    if (isNaN(commentId)) {
      return new Response(JSON.stringify({ error: 'Invalid or missing comment ID' }), { status: 400 });
    }

    console.log('Deleting comment:', commentId);

    const commentRecord = await prisma.comment.delete({
      where: { id: commentId },
    });

    console.log('Comment deleted successfully:', commentRecord);
    return new Response(JSON.stringify({ message: 'Comment successfully deleted' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return new Response(JSON.stringify({ error: 'Error deleting comment' }), { status: 500 });
  }
};
