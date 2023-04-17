import type { AnimalRepository } from 'server/gateways/animal';
import getOneById from './getOneById';
import getManyByIds from './getManyByIds';
import getManyByUserId from './getManyByUserId';
import getManyByOptions from './getAnimalsByOptions';
import updateById from './updateById';
import create from './create';
import deleteById from './deleteById';

type GetOneById = typeof getOneById;
type GetManyByIds = typeof getManyByIds;
type GetManyByUserId = typeof getManyByUserId;
type GetManyByOptions = typeof getManyByOptions;
type UpdateById = typeof updateById;
type Create = typeof create;
type DeleteById = typeof deleteById;
export class AnimalRepositoryPostgres implements AnimalRepository {
  async getOneById(
    animalId: Parameters<GetOneById>[0]
  ): ReturnType<GetOneById> {
    const animal = await getOneById(animalId);
    return animal;
  }

  async getManyByIds(
    animalIds: Parameters<GetManyByIds>[0]
  ): ReturnType<GetManyByIds> {
    const animal = await getManyByIds(animalIds);
    return animal;
  }

  async getManyByUserId(
    userId: Parameters<GetManyByUserId>[0]
  ): ReturnType<GetManyByUserId> {
    const animal = await getManyByUserId(userId);
    return animal;
  }

  async getManyByOptions(
    options: Parameters<GetManyByOptions>[0]
  ): ReturnType<GetManyByOptions> {
    const animals = await getManyByOptions(options);
    return animals;
  }

  async update(
    payload: Parameters<UpdateById>[0],
    userId: Parameters<UpdateById>[1]
  ): ReturnType<UpdateById> {
    const animal = await updateById(payload, userId);
    return animal;
  }

  async create(
    payload: Parameters<Create>[0],
    userId: Parameters<Create>[1]
  ): ReturnType<Create> {
    const animal = await create(payload, userId);
    return animal;
  }

  async deleteById(
    animalId: Parameters<DeleteById>[0],
    userId: Parameters<DeleteById>[1]
  ): ReturnType<DeleteById> {
    await deleteById(animalId, userId);
  }
}
