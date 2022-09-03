import getAnimalById from './index.server';
import type { Pet as PetType } from '~/features/pet/types';
import { db } from '~/utils/db/index.server';
import { ANIMAL } from 'spec/__mock__/constants/animal';
import { User } from 'spec/__mock__/constants/user';

beforeAll(async () => {
  await db.user.create({
    data: User
  });
});

afterAll(async () => {
  const deleteUser = db.user.deleteMany();
  const deleteAnimal = db.animal.deleteMany();
  await db.$transaction([deleteUser, deleteAnimal]);
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
  let result: PetType | null;
  const anotherUserId = 1;

  beforeAll(async () => {
    await db.animal.create({
      data: { ...ANIMAL, userId: User.id }
    });
    result = await getAnimalById(animalId, anotherUserId);
  });

  test('include follows', () => {
    expect(result).toHaveProperty('follows');
  });

  test('editable is false when animal.user is not current user', () => {
    expect(result).toHaveProperty('editable', false);
  });

  test('editable is true when animal.user is current user', async () => {
    result = await getAnimalById(animalId, User.id);
    expect(result).toHaveProperty('editable', true);
  });
});
