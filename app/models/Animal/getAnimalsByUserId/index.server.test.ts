import type { User } from '@prisma/client';
import getAnimalsByUserId from './index.server';
import { db } from '~/utils/db/index.server';
import { ANIMALS } from 'spec/__mock__/constants/animal';
import { USER } from 'spec/__mock__/constants/user';

let user: User;
beforeAll(async () => {
  const { id, ...payload } = USER;
  user = await db.user.create({
    data: payload
  });
  await db.animal.createMany({
    data: ANIMALS.map((animal) => ({ ...animal, userId: user.id }))
  });
});

afterAll(async () => {
  const deleteUsers = db.user.deleteMany();
  const deleteAnimals = db.animal.deleteMany();
  await db.$transaction([deleteUsers, deleteAnimals]);
  await db.$disconnect();
});

describe('getAnimals', () => {
  it(`return expected animals' length`, async () => {
    const simpleAnimals = await getAnimalsByUserId(user.id);
    expect(simpleAnimals).toHaveLength(ANIMALS.length);
  });

  it('return simpleAnimals', async () => {
    const simpleAnimals = await getAnimalsByUserId(user.id);
    const properties = ['id', 'gender', 'family', 'location', 'imageUrl'];
    properties.forEach((property) => {
      expect(simpleAnimals[0]).toHaveProperty(property);
    });
  });
});
