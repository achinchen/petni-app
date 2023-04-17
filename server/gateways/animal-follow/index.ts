import type { AnimalFollow } from 'server/entities/animal-follow';

export interface AnimalFollowRepository {
  increase(animalId: AnimalFollow['animalId']): Promise<AnimalFollow>;
  decrease(animalId: AnimalFollow['animalId']): Promise<null | AnimalFollow>;
  getOneByAnimalId(
    animalId: AnimalFollow['animalId']
  ): Promise<null | AnimalFollow>;
}
