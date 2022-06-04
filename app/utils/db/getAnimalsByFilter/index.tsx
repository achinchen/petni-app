import type { DogColor } from '~/constants/dogs';
import type { CatColor } from '~/constants/cats';
import type { Family, Animal, Gender, Size } from '@prisma/client';
import { db } from '~/utils/db/index.server';
import { ANIMAL_COUNT, SEARCH_KEY_DIST } from './constants';

export default async (filter: null | FormData = null): Promise<Animal[]> => {
  if (!filter) {
    const animals = await db.$queryRaw<
      Animal[]
    >`SELECT * FROM "Animal" ORDER BY random() LIMIT 10`;
    return animals;
  }

  const options: {
    family?: Family;
    gender?: Gender;
    size?: Size;
    color?: { search: string };
  } = {};

  const family = filter.get('family') as Family;
  if (family) options.family = family;

  const gender = filter.get('gender') as Gender;
  if (gender) options.gender = gender;

  const size = filter.get('size') as Size;
  if (size) options.size = size;

  const color = filter.get('color') as DogColor & CatColor;

  const colorSearchKey = SEARCH_KEY_DIST[family]?.[color] || '';
  if (colorSearchKey) options.color = { search: colorSearchKey };

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
