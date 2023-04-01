import type { Animal } from 'server/entities/animal';
import type { User } from 'server/entities/user';
import type { Prisma } from '@prisma/client';
import { db } from '~/utils/db/index.server';

export default async (animal: Animal, userId: User['id']): Promise<Animal> => {
  const record = await db.animal.create({
    data: {
      ...animal,
      address: animal.location,
      userId
    } as unknown as Prisma.AnimalCreateInput
  });

  return record as unknown as Animal;
};
