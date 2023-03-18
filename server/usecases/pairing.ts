import type { Options } from '~/models/Animal/type';
import type { Animal } from 'server/entities/animal';
import type { AnimalRepository } from 'server/gateways/animal';

export class PairingUseCase {
  constructor(private readonly animalRepository: AnimalRepository) {}

  async getPairingAnimals(options: Options): Promise<Animal[]> {
    const animals = await this.animalRepository.getManyByOptions(options);
    return animals;
  }
}
