import prisma from './database';

async function initialize() {
  try {
    await prisma.$connect();
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS users (
        email TEXT PRIMARY KEY,
        password TEXT,
        balance TEXT,
        address TEXT
      )
    `;
    console.log('Database initialized');
  } catch (error) {
    console.error('Error initializing database', error);
  } finally {
    await prisma.$disconnect();
  }
}

initialize().catch((error) => console.error(error));
