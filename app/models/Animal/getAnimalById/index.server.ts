import type { User } from '@prisma/client';
import type { Pet as PetType } from '~/features/pet/types';
import type { AnimalId } from '~/models/Animal/type';
import { db } from '~/utils/db/index.server';

export default async function getAnimalById(
  id: AnimalId,
  userId?: User['id']
): Promise<PetType | null> {
  const animal = await db.animal.findUnique({
    where: { id },
    include: {
      follows: {
        select: {
          count: true
        }
      },
      user: true
    }
  });

  if (!animal) return null;

  const { follows, user, ...restInfo } = animal;
  const count = follows[0]?.count || 0;

  return Object.assign(restInfo, {
    follows: count,
    editable: userId ? userId === user?.id : false
  });
}
