import type { Animal } from 'server/entities/animal.entity';
import type { User } from 'server/entities/user.entity';
import type { EditingAnimal, Options } from '~/models/Animal/type';

type AnimalId = Animal['id'];
type UserId = User['id'];

export interface AnimalRepository {
  create(animal: EditingAnimal): Promise<Animal>;
  update(animal: AnimalId): Promise<void>;
  delete(animal: Animal): Promise<void>;
  getOneById(id: AnimalId, userId?: UserId): Promise<Animal | null>;
  getManyByIds(animalIds: AnimalId[]): Promise<Animal[]>;
  getManyByOptions(options: Options): Promise<Animal[]>;
  getManyByUserId(userId: UserId): Promise<Animal[]>;
}
