import type { DogColor } from '~/constants/dogs';
import type { CatColor } from '~/constants/cats';
import type { Animal, Family, Gender, Size } from '@prisma/client';
import { db } from '~/utils/db/index.server';
import { ANIMAL_COUNT, SEARCH_KEY_DIST } from './constants';

export type Filter = {
  family?: Family;
  gender?: Gender;
  size?: Size;
  color?: string;
};

export default async (filter: Filter): Promise<Animal[]> => {
  if (!Object.keys(filter).length) {
    const animals = await db.$queryRaw<
      Animal[]
    >`SELECT * FROM "Animal" ORDER BY random() LIMIT 10`;
    return animals;
  }

  const { color, family, size, gender } = filter;

  const options: {
    family?: Family;
    gender?: Gender;
    size?: Size;
    color?: { search: string };
  } = {};

  if (family) options.family = family;
  if (size) options.size = size;
  if (gender) options.gender = gender;

  if (color && family) {
    options.color = {
      search: SEARCH_KEY_DIST[family]?.[color as DogColor & CatColor]
    };
  }

  const animalCounts = await db.animal.count({
    where: options
  });

  const skip = Math.floor(Math.random() * animalCounts);

  const animals = await db.animal.findMany({
    where: options,
    take: ANIMAL_COUNT,
    skip: skip
  });

  return animals;
};
