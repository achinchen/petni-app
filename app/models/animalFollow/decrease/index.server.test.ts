import type { AnimalFollow } from '@prisma/client';
import decreaseFollow from './index.server';
import { db } from '~/utils/db/index.server';
import { ANIMAL } from 'spec/mock/constants/animal';

beforeAll(async () => {
  await db.animal.create({
    data: ANIMAL
  });
});

afterAll(async () => {
  const deleteAnimal = db.animal.deleteMany();
  const deleteAnimalFollow = db.animalFollow.deleteMany();
  await db.$transaction([deleteAnimal, deleteAnimalFollow]);
  await db.$disconnect();
});

const animalId = ANIMAL.id;
let animalFollow: AnimalFollow | null;

describe('AnimalFollow not exist', () => {
  test('return null', async () => {
    const result = await decreaseFollow(animalId);

    expect(result).toBe(null);
  });
});

describe('AnimalFollow exists', () => {
  let beforeDecreaseAnimalFollowCount: number;
  let result: any;
  beforeAll(async () => {
    await db.animalFollow.create({
      data: {
        animalId,
        count: 10
      }
    });

    animalFollow = await db.animalFollow.findFirst({ where: { animalId } });
    beforeDecreaseAnimalFollowCount = animalFollow?.count!;

    result = await decreaseFollow(animalId);
    animalFollow = await db.animalFollow.findFirst({ where: { animalId } });
  });

  test('AnimalFollow.count be decreased', () => {
    expect(animalFollow).toHaveProperty(
      'count',
      beforeDecreaseAnimalFollowCount - 1
    );
  });

  test('return truthy', () => {
    expect(result).toBeTruthy();
  });
});
