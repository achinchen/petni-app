import { db } from '~/utils/db/index.server';
import { getAnimals } from './utils';

export default async function updateAnimals() {
  const animals = await getAnimals();
  if (!animals) return;

  await Promise.allSettled(
    animals.map((animal) =>
      db.animal.upsert({
        create: animal,
        update: animal,
        where: { id: animal.id }
      })
    )
  );
}
