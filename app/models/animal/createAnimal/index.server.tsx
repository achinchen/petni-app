import type { Animal } from '@prisma/client';
import { db } from '~/utils/db/index.server';

export type CreatedAnimal = Omit<
  Animal,
  'code' | 'openAt' | 'createdAt' | 'updatedAt'
>;

export default async (animal: CreatedAnimal): Promise<Animal> => {
  const record = await db.animal.create({
    data: animal
  });

  return record;
};
