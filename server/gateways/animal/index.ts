import type { Animal } from 'server/entities/animal';
import type { User } from 'server/entities/user';
import type { Options } from '~/models/Animal/type';

type AnimalId = Animal['id'];
type UserId = User['id'];
export type LooseAnimal = Partial<Animal> & Pick<Animal, 'id'>;

export interface AnimalRepository {
  create(animal: Animal, userId: UserId): Promise<Animal | null>;
  update(animal: LooseAnimal, userId: UserId): Promise<Animal | null>;
  delete?(animal: Animal): Promise<void>;
  getOneById(id: AnimalId, userId?: UserId): Promise<Animal | null>;
  getManyByIds?(animalIds: AnimalId[]): Promise<Animal[]>;
  getManyByOptions?(options: Options): Promise<Animal[]>;
  getManyByUserId?(userId: UserId): Promise<Animal[]>;
}
