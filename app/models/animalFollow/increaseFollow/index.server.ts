import type { Animal } from '@prisma/client';
import { db } from '~/utils/db/index.server';

export default async function createFollow(animalId: Animal['id']) {
  const animal = await db.animalFollow.findFirst({ where: { animalId } });

  if (!animal) {
    const animalFollow = await db.animalFollow.create({
      data: {
        animalId
      }
    });

    return animalFollow;
  }

  // work around: https://github.com/prisma/prisma/issues/7290
  const animalFollow = await db.animalFollow.updateMany({
    where: { animalId },
    data: {
      count: {
        increment: 1
      }
    }
  });

  return animalFollow;
}
