import type { DogColor } from '~/constants/dogs';
import type { CatColor } from '~/constants/cats';
import type { Animal, Family, Gender, Size } from '@prisma/client';
import { db } from '~/utils/db/index.server';
import { ANIMAL_COUNT, SEARCH_KEY_DIST } from './constants';
import getNearCitiesByCity from './getNearCitiesByCity';

export type Options = {
  family?: Family;
  gender?: Gender;
  size?: Size;
  color?: string;
  city?: string;
};

export default async function getAnimalByOptions(
  options: Options
): Promise<Animal[]> {
  if (!Object.keys(options).length) {
    const animals = await db.$queryRaw<
      Animal[]
    >`SELECT * FROM "Animal" ORDER BY random() LIMIT ${ANIMAL_COUNT}`;
    return animals;
  }

  const { color, family, size, gender, city } = options;

  const query: {
    family?: Family;
    gender?: Gender;
    size?: Size;
    location?: { contains: string };
    color?: { contains: string };
    OR?: { color?: { contains: string }; location?: { contains: string } }[];
  } = {};

  if (family) query.family = family;
  if (size) query.size = size;
  if (gender) query.gender = gender;

  if (color && family) {
    const searchKeys = SEARCH_KEY_DIST[family]?.[
      color as DogColor & CatColor
    ] as string[];
    if (searchKeys.length === 1) query.color = { contains: searchKeys[0] };
    else query.OR = searchKeys.map((key) => ({ color: { contains: key } }));
  }

  if (city) {
    const cities = getNearCitiesByCity(city);
    const citiesQuery = cities.map((city) => ({
      location: { contains: city }
    }));

    if (cities.length === 1) query.location = { contains: cities[0] };
    else query.OR = query.OR ? [...query.OR, ...citiesQuery] : citiesQuery;
  }

  const animalCounts = await db.animal.count({
    where: query
  });

  const skip = Math.floor(Math.random() * animalCounts);

  const animals = await db.animal.findMany({
    where: query,
    take: ANIMAL_COUNT,
    skip: skip
  });

  return animals;
}
