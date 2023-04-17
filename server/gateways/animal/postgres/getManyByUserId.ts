import type { Animal } from 'server/entities/animal';
import type { User } from 'server/entities/user';
import { db } from '~/utils/db/index.server';

export type UserId = User['id'];

export default async function getAnimalByIds(
  id: UserId
): Promise<Animal[] | null> {
  const animals = await db.animal.findMany({
    where: {
      userId: id
    },
    select: {
      id: true,
      gender: true,
      family: true,
      location: true,
      imageUrl: true
    }
  });

  if (!animals) return null;
  return animals as unknown as Animal[];
}
