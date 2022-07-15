import type { Animal } from '@prisma/client';
import type { EditingAnimal } from '~/models/animal/type';
import { db } from '~/utils/db/index.server';

export default async (payload: EditingAnimal): Promise<Animal> => {
  const { id, ...data } = payload;
  const record = await db.animal.update({
    data,
    where: {
      id
    }
  });

  return record;
};
