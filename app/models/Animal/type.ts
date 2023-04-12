import type { Animal } from 'server/entities/animal';
export type { Options } from '../../../server/gateways/animal/postgres/getAnimalsByOptions';

export type AnimalId = Animal['id'];

export type EditingAnimal = Omit<
  Animal,
  'code' | 'openAt' | 'createdAt' | 'updatedAt' | 'address' | 'userId'
>;

export type SimpleAnimal = Pick<
  Animal,
  'id' | 'family' | 'gender' | 'location' | 'imageUrl'
>;
