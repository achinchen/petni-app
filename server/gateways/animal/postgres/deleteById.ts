import type { User } from 'server/entities/user';
import type { Animal } from 'server/entities/animal';
import { db } from '~/utils/db/index.server';

export default async (
  AnimalId: Animal['id'],
  userId: User['id']
): Promise<void> => {
  await db.user.update({
    where: {
      id: userId
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
