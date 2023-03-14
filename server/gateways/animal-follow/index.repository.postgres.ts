import type { AnimalFollow } from 'server/entities/animal-follow.entity';
import type { AnimalFollow as AnimalFollowPrisma } from '@prisma/client';
import type { AnimalFollowRepository } from './index.repository';
import { db } from '~/utils/db/index.server';

const converter = ({
  id,
  animalId,
  ...rest
}: AnimalFollowPrisma): AnimalFollow => ({
  id: String(id),
  animalId: String(animalId),
  ...rest
});

export class AnimalFollowRepositoryPostgres implements AnimalFollowRepository {
  async increase(animalId: AnimalFollow['animalId']) {
    const animal = await db.animalFollow.findFirst({
      where: { animalId: Number(animalId) }
    });

    if (!animal) {
      const animalFollow = await db.animalFollow.create({
        data: {
          animalId: Number(animalId)
        }
      });

      return converter(animalFollow);
    }

    // work around: https://github.com/prisma/prisma/issues/7290
    const { count } = await db.animalFollow.updateMany({
      where: { animalId: Number(animalId) },
      data: {
        count: {
          increment: 1
        }
      }
    });

    return converter({ ...animal, count });
  }

  async decrease(animalId: AnimalFollow['animalId']) {
    const animal = await db.animalFollow.findFirst({
      where: { animalId: Number(animalId) }
    });

    if (!animal) return null;

    const { count } = await db.animalFollow.updateMany({
      where: { animalId: Number(animalId) },
      data: { count: { decrement: 1 } }
    });

    return converter({ ...animal, count });
  }
}
