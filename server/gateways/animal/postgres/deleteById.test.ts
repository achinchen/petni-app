import type { User } from 'server/entities/user';
import type { Prisma } from '@prisma/client';
import deleteAnimalByUserId from './deleteById';
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
    data: { ...ANIMAL, userId: user.id } as unknown as Prisma.AnimalCreateInput
  });
});

describe('delete animal', () => {
  it('successfully delete animal', async () => {
    await deleteAnimalByUserId(ANIMAL.id, user.id);
    const result = await db.animal.findUnique({ where: { id: ANIMAL.id } });
    expect(result).toBeFalsy();
  });
});
