import path from 'node:path';
import dotenv from 'dotenv';
import { db } from '~/utils/db/index.server';
import { getAnimals } from '~/jobs/updateAnimals/utils';
import type { Animal } from '@prisma/client';
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

async function seed() {
  const animals = await getAnimals();
  if (!animals) return;

  await db.animal.createMany({
    data: animals as Animal[]
  });

  console.log('Finish');
}

seed();
