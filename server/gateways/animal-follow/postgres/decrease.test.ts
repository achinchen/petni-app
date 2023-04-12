import type { AnimalFollow } from 'server/entities/animal-follow';
import type { Prisma } from '@prisma/client';
import { db } from '~/utils/db/index.server';
import { AnimalFollowRepositoryPostgres } from '.';
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
  const deleteAnimal = db.animal.delete({ where: { id: ANIMAL.id } });
  const deleteAnimalFollow = db.animalFollow.deleteMany({
    where: { animalId: ANIMAL.id }
  });
  await db.$transaction([deleteAnimal, deleteAnimalFollow]);
  await db.$disconnect();
});

const animalId = ANIMAL.id;
let animalFollow: AnimalFollow | null;

describe('AnimalFollow not exist', () => {
  test('return null', async () => {
    const result = await animalFollowRepositoryPostgres.decrease(animalId);

    expect(result).toBe(null);
  });
});

describe('AnimalFollow exists', () => {
  let beforeDecreaseAnimalFollowCount: number;
  let result: any;
  beforeAll(async () => {
    await db.animalFollow.create({
      data: {
        animalId: Number(animalId),
        count: 10
      }
    });

    animalFollow = await db.animalFollow.findFirst({
      where: { animalId: Number(animalId) }
    });
    beforeDecreaseAnimalFollowCount = animalFollow?.count!;

    result = await animalFollowRepositoryPostgres.decrease(animalId);
    animalFollow = await db.animalFollow.findFirst({
      where: { animalId: Number(animalId) }
    });
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
