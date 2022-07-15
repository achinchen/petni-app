import type { Animal } from '@prisma/client';
import type { EditingAnimal } from '~/models/animal/type';
import { db } from '~/utils/db/index.server';

export default async (animal: EditingAnimal): Promise<Animal> => {
  const record = await db.animal.create({
    data: animal
  });

  return record;
};
