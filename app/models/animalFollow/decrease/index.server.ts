import type { AnimalId } from '~/models/animal/type';
import { db } from '~/utils/db/index.server';

export default async function createFollow(animalId: AnimalId) {
  const animal = await db.animalFollow.findFirst({ where: { animalId } });

  if (!animal) return null;

  const animalFollow = await db.animalFollow.updateMany({
    where: { animalId },
    data: { count: { decrement: 1 } }
  });

  return animalFollow;
}
