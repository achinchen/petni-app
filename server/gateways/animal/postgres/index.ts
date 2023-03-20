import type { AnimalRepository } from 'server/gateways/animal';
import getOneById from './getOneById';

type GetOneById = typeof getOneById;

export class AnimalRepositoryPostgres implements AnimalRepository {
  async getOneById(
    animalId: Parameters<GetOneById>[0]
  ): ReturnType<GetOneById> {
    const animal = await getOneById(animalId);
    return animal;
  }
}
