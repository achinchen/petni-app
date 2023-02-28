import type { AnimalFollow } from 'server/entities/animal-follow.entity';

export interface AnimalFollowRepository {
  increase(animalId: AnimalFollow['animalId']): Promise<void>;
  decrease(animalId: AnimalFollow['animalId']): Promise<void>;
}
