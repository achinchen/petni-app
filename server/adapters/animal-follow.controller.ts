import type { AnimalFollow } from 'server/entities/animal-follow';
import type { AnimalFollowUseCase } from 'server/usecases/animal-follow';
import type {
  AnimalFollowPresenter,
  Payload
} from 'server/adapters/animal-follow.presenter';

export class AnimalFollowController {
  constructor(
    private readonly animalFollowUseCase: AnimalFollowUseCase,
    private readonly animalFollowPresenter: AnimalFollowPresenter
  ) {}

  async followRequest(animalId: AnimalFollow['animalId']): Promise<Payload> {
    if (!animalId) return this.animalFollowPresenter.invalidInput();
    const result = await this.animalFollowUseCase.follow(animalId);
    if (!result) return this.animalFollowPresenter.failed();
    return this.animalFollowPresenter.success();
  }

  async unfollowRequest(animalId: AnimalFollow['animalId']): Promise<Payload> {
    if (!animalId) return this.animalFollowPresenter.invalidInput();
    const result = await this.animalFollowUseCase.unfollow(animalId);
    if (!result) return this.animalFollowPresenter.failed();
    return this.animalFollowPresenter.success();
  }
}
