import type { User } from '@prisma/client';
import type { AnimalId } from '~/models/animal/type';
import { db } from '~/utils/db/index.server';

export default async (AnimalId: AnimalId, user: User) => {
  await db.user.update({
    where: {
      id: user.id
    },
    data: {
      Animal: {
        delete: {
          id: AnimalId
        }
      }
    }
  });
};
