import type { AnimalFollow } from 'server/entities/animal-follow';
import type { AnimalFollowUseCase } from 'server/usecases/animal-follow';
import type {
  AnimalFollowPresenter,
  Payload
} from 'server/adapters/animal-follow/index.presenter';

export class AnimalFollowController {
  constructor(
    private readonly animalFollowUseCase: AnimalFollowUseCase,
    private readonly animalFollowPresenter: AnimalFollowPresenter
  ) {}

  async follow(animalId: AnimalFollow['animalId']): Promise<Payload> {
    if (!animalId) return this.animalFollowPresenter.invalidInput();
    try {
      await this.animalFollowUseCase.follow(animalId);
      return this.animalFollowPresenter.success();
    } catch {
      return this.animalFollowPresenter.failed();
    }
  }

  async unfollow(animalId: AnimalFollow['animalId']): Promise<Payload> {
    if (!animalId) return this.animalFollowPresenter.invalidInput();
    const result = await this.animalFollowUseCase.unfollow(animalId);
    if (!result) return this.animalFollowPresenter.failed();
    return this.animalFollowPresenter.success();
  }
}
