import type { Pet as PetType } from '~/features/pet/types';
import { db } from '~/utils/db/index.server';

export default async function getAnimalById(
  id: number
): Promise<PetType | null> {
  const animal = await db.animal.findUnique({
    where: { id },
    include: { _count: { select: { follows: true } } }
  });

  if (!animal) return animal;
  const { _count, ...restInfo } = animal;
  return Object.assign(restInfo, _count);
}
