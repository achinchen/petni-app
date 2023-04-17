import type { User } from 'server/entities/user';
import type { Animal } from 'server/entities/animal';
import type { LooseAnimal, Options } from 'server/gateways/animal';
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

  async getCreated(userId: User['id']): Promise<Payload> {
    if (!userId) return this.animalPresenter.forbidden();
    try {
      const result = await this.animalUseCase.getCreatedAnimals(userId);
      if (!result) return this.animalPresenter.notFound();
      return this.animalPresenter.success(result);
    } catch {
      return this.animalPresenter.failed();
    }
  }

  async getFavorites(animalIds: Animal['id'][]): Promise<Payload> {
    if (!animalIds.length) return this.animalPresenter.invalidInput();
    try {
      const result = await this.animalUseCase.getFavoritesAnimals(animalIds);
      if (!result) return this.animalPresenter.notFound();
      return this.animalPresenter.success(result);
    } catch {
      return this.animalPresenter.failed();
    }
  }

  async getFiltered(options: Options): Promise<Payload> {
    try {
      const result = await this.animalUseCase.getFilteredAnimals(options);
      if (!result) return this.animalPresenter.notFound();
      return this.animalPresenter.success(result);
    } catch {
      return this.animalPresenter.failed();
    }
  }

  async updateAnimal(
    payload: LooseAnimal,
    userId: User['id']
  ): Promise<Payload> {
    if (!userId) return this.animalPresenter.forbidden();

    const { id, ...rest } = payload;
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

  async createAnimal(payload: Animal, userId: User['id']): Promise<Payload> {
    if (!userId) return this.animalPresenter.forbidden();

    const { id, ...rest } = payload;
    if (!Object.entries(rest).flat().filter(Boolean).length)
      return this.animalPresenter.invalidInput();
    try {
      const result = await this.animalUseCase.createAnimal(payload, userId);
      if (!result) return this.animalPresenter.failed();
      return this.animalPresenter.success(result);
    } catch {
      return this.animalPresenter.failed();
    }
  }

  async deleteAnimal(
    animalId: Animal['id'],
    userId: User['id']
  ): Promise<Payload> {
    if (!userId) return this.animalPresenter.forbidden();
    if (!animalId) return this.animalPresenter.invalidInput();
    try {
      await this.animalUseCase.deleteAnimal(animalId, userId);
      return this.animalPresenter.saveSuccess();
    } catch {
      return this.animalPresenter.failed();
    }
  }
}
