import path from 'node:path';
import dotenv from 'dotenv';
import { db } from '~/utils/db/index.server';
import { EXISTED_ANIMALS } from 'spec/mock/constants/animal';
import { EXISTED_USER } from 'spec/mock/constants/user';
dotenv.config({ path: path.resolve(__dirname, '../../.env.test') });

async function seed() {
  const user = await db.user.create({
    data: EXISTED_USER
  });

  await db.animal.createMany({
    data: EXISTED_ANIMALS.map((animal) => ({ ...animal, userId: user.id }))
  });

  console.log('Finish seeding');
}

seed();
