import type { User } from 'server/entities/user';
import type { Animal } from 'server/entities/animal';
import type { Prisma } from '@prisma/client';
import getAnimalById from './getOneById';
import { db } from '~/utils/db/index.server';
import { EXISTED_USER } from 'spec/mock/constants/user';
import { getAnimal } from 'spec/mock/constants/animal';

let user: User;
const ANIMAL = getAnimal();
beforeAll(async () => {
  user = await db.user.findUniqueOrThrow({
    where: {
      email: EXISTED_USER.email
    }
  });
});

afterAll(async () => {
  const deleteAnimal = db.animal.delete({ where: { id: ANIMAL.id } });
  await db.$transaction([deleteAnimal]);
  await db.$disconnect();
});

const animalId = ANIMAL.id;

describe('Animal not exist', () => {
  test('return null', async () => {
    const result = await getAnimalById(animalId);
    expect(result).toBe(null);
  });
});

describe('Animal exist', () => {
  let result: Animal | null;

  beforeAll(async () => {
    await db.animal.create({
      data: {
        ...ANIMAL,
        userId: user.id
      } as unknown as Prisma.AnimalCreateInput
    });
    result = await getAnimalById(animalId);
  });

  test('include follows', () => {
    expect(result).toHaveProperty('follows');
  });
});
