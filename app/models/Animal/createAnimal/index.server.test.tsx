import type { User, Animal } from '@prisma/client';
import createAnimal from './index.server';
import { db } from '~/utils/db/index.server';
import { ANIMAL } from 'spec/mock/constants/animal';
import { USER } from 'spec/mock/constants/user';

let user: User;
beforeAll(async () => {
  const { id, ...payload } = USER;
  user = await db.user.create({
    data: payload
  });
});

afterAll(async () => {
  const deleteUsers = db.user.deleteMany();
  const deleteAnimals = db.animal.deleteMany();
  await db.$transaction([deleteUsers, deleteAnimals]);
  await db.$disconnect();
});

describe('createAnimal', () => {
  let animal: Animal;
  beforeAll(async () => {
    animal = await createAnimal(ANIMAL, user);
  });

  it('animal.address is same with animal.location', () => {
    expect(animal.address).toBe(animal.location);
  });

  it('return animal', () => {
    expect(animal).toBeTruthy();
  });

  it('animal be created', async () => {
    const createdAnimal = await db.animal.findUnique({
      where: { id: animal.id }
    });
    expect(createdAnimal).toBeTruthy();
  });
});
