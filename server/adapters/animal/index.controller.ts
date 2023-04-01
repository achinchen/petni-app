import type { User } from 'server/entities/user';
import type { Animal } from 'server/entities/animal';
import type { AnimalUseCase } from 'server/usecases/animal';
import type {
  AnimalPresenter,
  Payload
} from 'server/adapters/animal/index.presenter';

export class AnimalController {
  constructor(
    private readonly animalUseCase: AnimalUseCase,
    private readonly animalPresenter: AnimalPresenter
  ) {}

  async getInfo(animalId: Animal['id'], userId?: User['id']): Promise<Payload> {
    if (!animalId) return this.animalPresenter.invalidInput();
    try {
      const result = await this.animalUseCase.getAnimalInfo(animalId, userId);
      if (!result) return this.animalPresenter.notFound();
      return this.animalPresenter.success(result);
    } catch {
      return this.animalPresenter.failed();
    }
  }

  async updateAnimal(
    payload: Partial<Animal> & Pick<Animal, 'id'>,
    userId: User['id']
  ): Promise<Payload> {
    const { id, ...rest } = payload;
    if (!userId) return this.animalPresenter.forbidden();
    if (!Object.entries(rest).flat().filter(Boolean).length)
      return this.animalPresenter.invalidInput();
    try {
      const result = await this.animalUseCase.updateAnimal(payload, userId);
      if (!result) return this.animalPresenter.failed();
      return this.animalPresenter.success(result);
    } catch {
      return this.animalPresenter.failed();
    }
  }
}
