import { db } from '~/utils/db/index.server';
import { getAnimals } from '~/jobs/updateAnimals/utils';

async function seed() {
  const animals = await getAnimals();
  if (!animals) return;

  await db.animal.createMany({
    data: animals
  });

  console.log('Finish');
}

seed();
