import type { Animal, User } from '@prisma/client';
import type { EditingAnimal } from '~/models/animal/type';
import { db } from '~/utils/db/index.server';

export default async (animal: EditingAnimal, user: User): Promise<Animal> => {
  const record = await db.animal.create({
    data: {
      ...animal,
      address: animal.location,
      userId: user.id
    }
  });

  return record;
};
