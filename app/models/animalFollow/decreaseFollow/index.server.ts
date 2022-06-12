import type { Animal } from '@prisma/client';
import { db } from '~/utils/db/index.server';

export default async function createFollow(animalId: Animal['id']) {
  const animal = db.animalFollow.findFirst({ where: { animalId } });

  if (!animal) return null;
  const animalFollow = await db.animalFollow.updateMany({
    where: { animalId },
    data: { count: { decrement: 1 } }
  });

  return animalFollow;
}
