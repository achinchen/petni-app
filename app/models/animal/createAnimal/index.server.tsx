import type { Animal } from '@prisma/client';
import { db } from '~/utils/db/index.server';

export type EditingAnimal = Omit<
  Animal,
  'code' | 'openAt' | 'createdAt' | 'updatedAt'
>;

export default async (animal: EditingAnimal): Promise<Animal> => {
  const record = await db.animal.create({
    data: animal
  });

  return record;
};
