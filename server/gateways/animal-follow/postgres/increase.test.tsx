import type { AnimalFollow } from 'server/entities/animal-follow';
import type { Prisma } from '@prisma/client';
import { AnimalFollowRepositoryPostgres } from './index';
import { db } from '~/utils/db/index.server';
import { getAnimal } from 'spec/mock/constants/animal';
import { EXISTED_USER } from 'spec/mock/constants/user';

const ANIMAL = getAnimal();
let animalFollowRepositoryPostgres: AnimalFollowRepositoryPostgres;

beforeAll(async () => {
  animalFollowRepositoryPostgres = new AnimalFollowRepositoryPostgres();
  await db.animal.create({
    data: {
      ...ANIMAL,
      userId: EXISTED_USER.id
    } as unknown as Prisma.AnimalCreateInput
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
        animalId: Number(animalId)
      }
    });
  });

  test('create AnimalFollow', async () => {
    expect(animalFollow).toBe(null);

    await animalFollowRepositoryPostgres.increase(animalId);

    animalFollow = await db.animalFollow.findFirst({
      where: {
        animalId: Number(animalId)
      }
    });

    expect(animalFollow).toHaveProperty('animalId', animalId);
  });

  test('AnimalFollow.count be 1', async () => {
    await animalFollowRepositoryPostgres.increase(animalId);
    expect(animalFollow).toHaveProperty('count', 1);
  });

  test('return truthy', async () => {
    const result = await animalFollowRepositoryPostgres.increase(animalId);
    expect(result).toBeTruthy();
  });
});

describe('AnimalFollow exists', () => {
  let beforeIncreaseFollowCount: number;
  let result: any;

  beforeEach(async () => {
    animalFollow = await db.animalFollow.findFirst({
      where: {
        animalId: Number(animalId)
      }
    });

    beforeIncreaseFollowCount = animalFollow?.count!;
    result = await animalFollowRepositoryPostgres.increase(animalId);
    animalFollow = await db.animalFollow.findFirst({
      where: {
        animalId: Number(animalId)
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
