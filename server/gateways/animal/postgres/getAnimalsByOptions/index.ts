import type { Prisma } from '@prisma/client';
import type { DogColor } from '~/constants/dogs';
import type { CatColor } from '~/constants/cats';
import type { Animal, Family, Gender, Size } from 'server/entities/animal';
import type { Options } from 'server/gateways/animal';
import { db } from '~/utils/db/index.server';
import {
  SEARCH_KEY_DIST,
  FILTERED_ANIMAL_COUNT
} from 'server/gateways/animal/constants';
import getNearCitiesByCity from 'server/gateways/animal/utils/getNearCitiesByCity';

export default async function getAnimalByOptions(
  options: Options
): Promise<Animal[] | null> {
  if (!Object.keys(options).length) {
    const animals = await db.$queryRaw<
      Animal[]
    >`SELECT * FROM "Animal" ORDER BY random() LIMIT ${FILTERED_ANIMAL_COUNT}`;
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
    where: query as Prisma.AnimalWhereInput
  });

  const skip = Math.floor(Math.random() * animalCounts);

  const animals = await db.animal.findMany({
    where: query as Prisma.AnimalWhereInput,
    take: FILTERED_ANIMAL_COUNT,
    skip: skip
  });

  if (!animals) return null;
  return animals as unknown as Animal[];
}
