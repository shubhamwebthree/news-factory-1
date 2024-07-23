// src/routes/feeds/+page.server.ts

import type { PageServerLoad } from './$types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const load: PageServerLoad = async () => {
  const news = await prisma.news.findMany({
    orderBy: {
      createdAt: 'desc', // Assuming you have a createdAt field in your schema
    },
  });
  return { news };
};
