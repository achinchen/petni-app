import type { Animal } from '~/entities/animal.entity';
import type { User } from '~/entities/user.entity';
import type { EditingAnimal, Options } from '~/models/Animal/type';

export interface AnimalRepository {
  create(animal: EditingAnimal): Promise<Animal>;
  update(animal: Animal['id']): Promise<void>;
  delete(animal: Animal): Promise<void>;
  getOneById(id: Animal['id'], userId?: User['id']): Promise<Animal | null>;
  getManyByIds(animal: Animal): Promise<Animal[]>;
  getManyByOptions(options: Options): Promise<Animal[]>;
  getManyByUserId(animal: Animal): Promise<Animal[]>;
}
