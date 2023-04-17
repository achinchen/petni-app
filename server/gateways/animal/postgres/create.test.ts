import type { Animal } from 'server/entities/animal';
import type { User } from 'server/entities/user';
import createAnimal from './create';
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
});

afterAll(async () => {
  const deleteAnimal = db.animal.delete({ where: { id: ANIMAL.id } });
  await db.$transaction([deleteAnimal]);
  await db.$disconnect();
});

describe('createAnimal', () => {
  let animal: Animal;
  beforeAll(async () => {
    animal = await createAnimal(ANIMAL, user.id);
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
