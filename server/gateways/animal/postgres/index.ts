import type { AnimalRepository } from 'server/gateways/animal';
import getOneById from './getOneById';
import updateAnimalById from './updateById';

type GetOneById = typeof getOneById;
type UpdateAnimalById = typeof updateAnimalById;

export class AnimalRepositoryPostgres implements AnimalRepository {
  async getOneById(
    animalId: Parameters<GetOneById>[0]
  ): ReturnType<GetOneById> {
    const animal = await getOneById(animalId);
    return animal;
  }
  async update(
    payload: Parameters<UpdateAnimalById>[0],
    userId: Parameters<UpdateAnimalById>[1]
  ): ReturnType<UpdateAnimalById> {
    const animal = await updateAnimalById(payload, userId);
    return animal;
  }
}
