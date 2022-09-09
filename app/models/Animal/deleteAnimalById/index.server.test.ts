import type { User } from '@prisma/client';
import deleteAnimalByUserId from './index.server';
import { db } from '~/utils/db/index.server';
import { getAnimal } from 'spec/mock/constants/animal';
import { EXISTED_USER } from 'spec/mock/constants/user';

let user: User;
const ANIMAL = getAnimal();
beforeAll(async () => {
  user = await db.user.findUniqueOrThrow({
    where: {
      email: EXISTED_USER.email
    }
  });

  await db.animal.create({
    data: { ...ANIMAL, userId: user.id }
  });
});

describe('delete animal', () => {
  it('successfully delete animal', async () => {
    await deleteAnimalByUserId(ANIMAL.id, user);
    const result = await db.animal.findUnique({ where: { id: ANIMAL.id } });
    expect(result).toBeFalsy();
  });
});
