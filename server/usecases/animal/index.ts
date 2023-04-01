import type { EditingAnimal } from '~/models/Animal/type';
import type { Animal } from 'server/entities/animal';
import type { AnimalRepository, LooseAnimal } from 'server/gateways/animal';
import type { AnimalFollowRepository } from 'server/gateways/animal-follow';
import type { AnimalFollow } from 'server/entities/animal-follow';
import type { User } from 'server/entities/user';

export type AnimalInfo = Animal & {
  count: AnimalFollow['count'];
  editable: boolean;
};
export class AnimalUseCase {
  constructor(
    private readonly animalRepository: AnimalRepository,
    private readonly animalFollowRepository?: AnimalFollowRepository
  ) {}

  async getCreatedAnimals(userId: User['id']): Promise<Animal[]> {
    const animals = await this.animalRepository.getManyByUserId!(userId);
    return animals;
  }

  async getFavoritesAnimals(animalIds: Animal['id'][]): Promise<Animal[]> {
    const animals = await this.animalRepository.getManyByIds!(animalIds);
    return animals;
  }

  async getAnimalInfo(
    animalId: Animal['id'],
    userId?: User['id']
  ): Promise<AnimalInfo | null> {
    const animal = await this.animalRepository.getOneById(animalId, userId);
    const animalFollow = await this.animalFollowRepository?.getOneByAnimalId(
      animalId
    );
    const count = animalFollow?.count ?? 0;
    const editable = userId ? animal?.userId === userId : false;

    return {
      ...animal,
      count,
      editable
    } as AnimalInfo;
  }

  async createAnimal(payload: EditingAnimal): Promise<Animal> {
    const animal = await this.animalRepository.create!(payload);
    return animal;
  }

  async updateAnimal(
    payload: LooseAnimal,
    userId: User['id']
  ): Promise<Animal | null> {
    const animal = await this.animalRepository.update(payload, userId);
    return animal;
  }

  async deleteAnimal(animal: Animal): Promise<void> {
    await this.animalRepository.delete!(animal);
  }
}
