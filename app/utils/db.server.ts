import { PrismaClient } from '@prisma/client';

let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient({ log: ['warn', 'error'] });
} else {
  if (!global.__db) {
    global.__db = new PrismaClient({ log: ['info', 'warn', 'error'] });
  }
  db = global.__db;
}

export { db };
