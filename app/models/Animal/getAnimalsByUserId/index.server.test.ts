import type { User } from '@prisma/client';
import getAnimalsByUserId from './index.server';
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

describe('getAnimals', () => {
  it(`return expected animals' length`, async () => {
    const simpleAnimals = await getAnimalsByUserId(user.id);
    const animals = await db.animal.findMany({ where: { userId: user.id } });
    expect(simpleAnimals).toHaveLength(animals.length);
  });

  it('return simpleAnimals', async () => {
    const simpleAnimals = await getAnimalsByUserId(user.id);
    const properties = ['id', 'gender', 'family', 'location', 'imageUrl'];
    properties.forEach((property) => {
      expect(simpleAnimals[0]).toHaveProperty(property);
    });
  });
});
