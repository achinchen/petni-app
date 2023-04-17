import type { AnimalFollow } from 'server/entities/animal-follow';
import type { AnimalFollowRepository } from 'server/gateways/animal-follow';
import { db } from '~/utils/db/index.server';

export class AnimalFollowRepositoryPostgres implements AnimalFollowRepository {
  async increase(animalId: AnimalFollow['animalId']) {
    const animal = await db.animalFollow.findFirst({
      where: { animalId }
    });

    if (!animal) {
      const animalFollow = await db.animalFollow.create({
        data: {
          animalId
        }
      });

      return animalFollow;
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

    return { ...animal, count };
  }

  async decrease(animalId: AnimalFollow['animalId']) {
    const animal = await db.animalFollow.findFirst({
      where: { animalId }
    });

    if (!animal) return null;

    const { count } = await db.animalFollow.updateMany({
      where: { animalId },
      data: { count: { decrement: 1 } }
    });

    return { ...animal, count };
  }

  async getOneByAnimalId(animalId: AnimalFollow['animalId']) {
    const animal = await db.animalFollow.findFirst({
      where: { animalId }
    });
    return animal;
  }
}
