import type { Animal, Family, Size, Gender } from 'server/entities/animal';
import type { User } from 'server/entities/user';

export type Options = {
  family?: Family;
  gender?: Gender;
  size?: Size;
  color?: string;
  city?: string;
};

type AnimalId = Animal['id'];
type UserId = User['id'];
type AnimalOrNull = Animal | null;
type AnimalsOrNull = Animal[] | null;
export type LooseAnimal = Partial<Animal> & Pick<Animal, 'id'>;

export interface AnimalRepository {
  create(animal: Animal, userId: UserId): Promise<AnimalOrNull>;
  update(animal: LooseAnimal, userId: UserId): Promise<AnimalOrNull>;
  deleteById(animalId: AnimalId, userId: UserId): Promise<void>;
  getOneById(id: AnimalId, userId?: UserId): Promise<AnimalOrNull>;
  getManyByIds(animalIds: AnimalId[]): Promise<AnimalsOrNull>;
  getManyByOptions(options: Options): Promise<AnimalsOrNull>;
  getManyByUserId(userId: UserId): Promise<AnimalsOrNull>;
}
