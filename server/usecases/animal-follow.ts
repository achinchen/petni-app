import type { AnimalFollow } from 'server/entities/animal-follow';
import type { AnimalFollowRepository } from 'server/gateways/animal-follow';

export class AnimalFollowUseCase {
  constructor(
    private readonly animalFollowRepository: AnimalFollowRepository
  ) {}

  async followAnimal(
    animalId: AnimalFollow['animalId']
  ): Promise<AnimalFollow> {
    const result = await this.animalFollowRepository.increase(animalId);
    return result;
  }

  async unfollowAnimal(
    animalId: AnimalFollow['animalId']
  ): Promise<AnimalFollow | null> {
    const result = await this.animalFollowRepository.decrease(animalId);
    return result;
  }
}
