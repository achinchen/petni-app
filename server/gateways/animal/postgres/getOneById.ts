import type { Animal } from 'server/entities/animal';
import { db } from '~/utils/db/index.server';

export default async function getOneById(
  id: Animal['id']
): Promise<Animal | null> {
  const animal = await db.animal.findUnique({
    where: { id },
    include: {
      user: true
    }
  });

  if (!animal) return null;
  const { user, ...info } = animal;
  const userId = user?.id;
  return { ...info, userId } as unknown as Animal;
}
