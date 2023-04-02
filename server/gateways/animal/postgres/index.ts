import type { AnimalRepository } from 'server/gateways/animal';
import getOneById from './getOneById';
import updateAnimalById from './updateById';
import createAnimal from './createAnimal';
import deleteAnimalById from './deleteAnimalById';

type GetOneById = typeof getOneById;
type UpdateAnimalById = typeof updateAnimalById;
type CreateAnimal = typeof createAnimal;
type DeleteAnimalById = typeof deleteAnimalById;
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

  async create(
    payload: Parameters<CreateAnimal>[0],
    userId: Parameters<CreateAnimal>[1]
  ): ReturnType<CreateAnimal> {
    const animal = await createAnimal(payload, userId);
    return animal;
  }

  async deleteById(
    animalId: Parameters<DeleteAnimalById>[0],
    userId: Parameters<DeleteAnimalById>[1]
  ): ReturnType<DeleteAnimalById> {
    await deleteAnimalById(animalId, userId);
  }
}
