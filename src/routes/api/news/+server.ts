// src/routes/api/news/+server.ts
import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { title, content, category, image } = await request.json();

    // Find the categoryId from the category name
    const categoryRecord = await prisma.category.create({
      data: { name: category },
    });
    console.log(categoryRecord)

    if (!categoryRecord) {
      return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 });
    }

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
    return new Response(JSON.stringify({ error: 'Error creating news' }), { status: 500 });
  }
};

// export const GET: RequestHandler = async () => {
//   try {
//     const news = await prisma.news.findMany({
//       include: {
//         category: true,
//       },
//     });

//     return new Response(JSON.stringify(news), { status: 200 });
//   } catch (error) {
//     console.error('Error fetching news:', error);
//     return new Response(JSON.stringify({ error: 'Error fetching news' }), { status: 500 });
//   }
// };

export const GET: RequestHandler = async () => { 
  try { 
    console.log('Fetching news...'); 
    const news = await prisma.news.findMany({ 
      include: { 
        category: true, 
      }, 
    }); 
    console.log('News fetched successfully:', news); 
    return new Response(JSON.stringify(news), { status: 200 }); 
  } catch (error) { 
    console.error('Error fetching news:', error); 
    return new Response(JSON.stringify({ error: 'Error fetching news' }), { status: 500 }); 
  } 
};