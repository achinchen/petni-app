import type { Animal } from 'server/entities/animal';
import { db } from '~/utils/db/index.server';

export default async function getAnimalByIds(
  ids: Animal['id'][]
): Promise<Animal[] | null> {
  const animals = await db.animal.findMany({
    where: {
      id: {
        in: ids
      }
    }
  });

  if (!animals) return null;
  return animals as unknown as Animal[];
}
