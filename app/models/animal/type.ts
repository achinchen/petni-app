import type { Animal } from '@prisma/client';

export type EditingAnimal = Omit<
  Animal,
  'code' | 'openAt' | 'createdAt' | 'updatedAt'
>;
