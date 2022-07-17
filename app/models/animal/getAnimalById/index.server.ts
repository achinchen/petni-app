import type { Pet as PetType } from '~/features/pet/types';
import type { AnimalId } from '~/models/animal/type';
import { db } from '~/utils/db/index.server';

export default async function getAnimalById(
  id: AnimalId
): Promise<PetType | null> {
  const animal = await db.animal.findUnique({
    where: { id },
    include: {
      follows: {
        select: {
          count: true
        }
      }
    }
  });

  if (!animal) return animal;
  const { follows, ...restInfo } = animal;
  const count = follows[0]?.count || 0;
  return Object.assign(restInfo, { follows: count });
}
