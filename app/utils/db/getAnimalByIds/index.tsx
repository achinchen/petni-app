import type { Animal } from '@prisma/client';
import { db } from '~/utils/db/index.server';

export type AnimalId = Animal['id'];
export type SimpleAnimal = Pick<
  Animal,
  'id' | 'family' | 'gender' | 'location' | 'imageUrl'
>;

export default async (ids: AnimalId[]): Promise<SimpleAnimal[]> => {
  const animals = await db.animal.findMany({
    where: {
      id: {
        in: ids
      }
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
};
