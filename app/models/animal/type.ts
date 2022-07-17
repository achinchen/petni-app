import type { Animal } from '@prisma/client';

export type EditingAnimal = Omit<
  Animal,
  'code' | 'openAt' | 'createdAt' | 'updatedAt' | 'address' | 'userId'
>;

export type SimpleAnimal = Pick<
  Animal,
  'id' | 'family' | 'gender' | 'location' | 'imageUrl'
>;
