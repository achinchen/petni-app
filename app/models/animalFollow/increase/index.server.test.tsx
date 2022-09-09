import type { AnimalFollow } from '@prisma/client';
import increaseFollow from './index.server';
import { db } from '~/utils/db/index.server';
import { getAnimal } from 'spec/mock/constants/animal';
import { EXISTED_USER } from 'spec/mock/constants/user';

const ANIMAL = getAnimal();

beforeAll(async () => {
  await db.animal.create({
    data: { ...ANIMAL, userId: EXISTED_USER.id }
  });
});

afterAll(async () => {
  const deleteAnimal = db.animal.deleteMany({ where: { id: ANIMAL.id } });
  const deleteAnimalFollow = db.animalFollow.deleteMany({
    where: { animalId: ANIMAL.id }
  });
  await db.$transaction([deleteAnimal, deleteAnimalFollow]);
  await db.$disconnect();
});

const animalId = ANIMAL.id;
let animalFollow: AnimalFollow | null;

describe('AnimalFollow not exist', () => {
  beforeAll(async () => {
    animalFollow = await db.animalFollow.findFirst({
      where: {
        animalId
      }
    });
  });

  test('create AnimalFollow', async () => {
    expect(animalFollow).toBe(null);

    await increaseFollow(animalId);

    animalFollow = await db.animalFollow.findFirst({
      where: {
        animalId
      }
    });

    expect(animalFollow).toHaveProperty('animalId', animalId);
  });

  test('AnimalFollow.count be 1', async () => {
    await increaseFollow(animalId);
    expect(animalFollow).toHaveProperty('count', 1);
  });

  test('return truthy', async () => {
    const result = await increaseFollow(animalId);
    expect(result).toBeTruthy();
  });
});

describe('AnimalFollow exists', () => {
  let beforeIncreaseFollowCount: number;
  let result: any;

  beforeEach(async () => {
    animalFollow = await db.animalFollow.findFirst({
      where: {
        animalId
      }
    });

    beforeIncreaseFollowCount = animalFollow?.count!;
    result = await increaseFollow(animalId);
    animalFollow = await db.animalFollow.findFirst({
      where: {
        animalId
      }
    });
  });

  test('AnimalFollow.count be increased', () => {
    expect(animalFollow).toHaveProperty('count', beforeIncreaseFollowCount + 1);
  });

  test('return truthy', async () => {
    expect(result).toBeTruthy();
  });
});
