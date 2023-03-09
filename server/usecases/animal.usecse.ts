import type { EditingAnimal } from '~/models/Animal/type';
import type { Animal } from 'server/entities/animal.entity';
import type { AnimalRepository } from 'server/gateways/animal.repository';
import type { User } from 'server/entities/user.entity';

export class AnimalUseCase {
  constructor(private readonly animalRepository: AnimalRepository) {}

  async getCreatedAnimals(userId: User['id']): Promise<Animal[]> {
    const animals = await this.animalRepository.getManyByUserId(userId);
    return animals;
  }

  async getFavoritesAnimals(animalIds: Animal['id'][]): Promise<Animal[]> {
    const animals = await this.animalRepository.getManyByIds(animalIds);
    return animals;
  }

  async getAnimalInfo(
    animalId: Animal['id'],
    userId?: User['id']
  ): Promise<Animal | null> {
    const animal = await this.animalRepository.getOneById(animalId, userId);
    return animal;
  }

  async createAnimal(payload: EditingAnimal): Promise<Animal> {
    const animal = await this.animalRepository.create(payload);
    return animal;
  }

  async updateAnimal(animalId: Animal['id']): Promise<void> {
    await this.animalRepository.update(animalId);
  }

  async deleteAnimal(animal: Animal): Promise<void> {
    await this.animalRepository.delete(animal);
  }
}
