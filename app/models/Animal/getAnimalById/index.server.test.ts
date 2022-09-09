import type { User } from '@prisma/client';
import type { Pet as PetType } from '~/features/pet/types';
import getAnimalById from './index.server';
import { db } from '~/utils/db/index.server';
import { USER, EXISTED_USER } from 'spec/mock/constants/user';
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
  let result: PetType | null;
  const anotherUserId = USER.id;

  beforeAll(async () => {
    await db.animal.create({
      data: { ...ANIMAL, userId: user.id }
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
    result = await getAnimalById(animalId, user.id);
    expect(result).toHaveProperty('editable', true);
  });
});
