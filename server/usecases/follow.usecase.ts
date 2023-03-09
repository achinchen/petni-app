import type { AnimalFollow } from 'server/entities/animal-follow.entity';
import type { AnimalFollowRepository } from 'server/gateways/animal-follow.repository';

export class FollowUseCase {
  constructor(
    private readonly animalFollowRepository: AnimalFollowRepository
  ) {}

  async followAnimal(animalId: AnimalFollow['animalId']): Promise<void> {
    await this.animalFollowRepository.increase(animalId);
  }

  async unfollowAnimal(animalId: AnimalFollow['animalId']): Promise<void> {
    await this.animalFollowRepository.decrease(animalId);
  }
}
