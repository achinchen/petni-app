import type { User } from '@prisma/client';
import deleteAnimalByUserId from './index.server';
import { db } from '~/utils/db/index.server';
import { ANIMAL } from 'spec/mock/constants/animal';
import { USER } from 'spec/mock/constants/user';

let user: User;
beforeAll(async () => {
  const { id, ...payload } = USER;
  user = await db.user.create({
    data: payload
  });
  await db.animal.create({
    data: { ...ANIMAL, userId: user.id }
  });
});

afterAll(async () => {
  const deleteUsers = db.user.deleteMany();
  const deleteAnimals = db.animal.deleteMany();
  await db.$transaction([deleteUsers, deleteAnimals]);
  await db.$disconnect();
});

describe('delete animal', () => {
  it('successfully delete animal', async () => {
    await deleteAnimalByUserId(ANIMAL.id, user);
    const result = await db.animal.findUnique({ where: { id: ANIMAL.id } });
    expect(result).toBeFalsy();
  });
});
