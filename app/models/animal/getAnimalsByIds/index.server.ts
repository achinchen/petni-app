import type { AnimalId } from '~/models/animal/type';
import type { SimpleAnimal } from '~/models/animal/type';
import { db } from '~/utils/db/index.server';

export default async function getAnimalByIds(
  ids: AnimalId[]
): Promise<SimpleAnimal[]> {
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
}
