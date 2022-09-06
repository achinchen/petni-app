import type { User } from '@prisma/client';
import type { SimpleAnimal } from '~/models/Animal/type';
import { db } from '~/utils/db/index.server';

export type UserId = User['id'];

export default async function getAnimalByIds(
  id: UserId
): Promise<SimpleAnimal[]> {
  const animals = await db.animal.findMany({
    where: {
      userId: id
    },
    select: {
      id: true,
      gender: true,
      family: true,
      location: true,
      imageUrl: true
    }
  });

  return animals;
}
