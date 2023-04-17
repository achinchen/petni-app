import type { User } from 'server/entities/user';
import getAnimalsByUserId from './getManyByUserId';
import { db } from '~/utils/db/index.server';
import { EXISTED_USER } from 'spec/mock/constants/user';

let user: User;
beforeAll(async () => {
  user = await db.user.findUniqueOrThrow({
    where: {
      email: EXISTED_USER.email
    }
  });
});

test(`return expected animals' length`, async () => {
  const result = await getAnimalsByUserId(user.id);
  const animals = await db.animal.findMany({ where: { userId: user.id } });
  expect(result).toHaveLength(animals.length);
});
