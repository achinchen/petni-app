import type { User } from 'server/entities/user';
import type { Animal } from 'server/entities/animal';
import type { LooseAnimal } from 'server/gateways/animal'
import type { Prisma } from '@prisma/client';
import { db } from '~/utils/db/index.server';
import { EXISTED_USER } from 'spec/mock/constants/user';
import { ANIMAL, ANIMALS } from 'spec/mock/constants/animal';
import updateAnimalById from './updateById';

let user: User;
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

afterAll(async () => {
  const deleteAnimal = db.animal.delete({ where: { id: ANIMAL.id } });
  await db.$transaction([deleteAnimal]);
  await db.$disconnect();
});

const mock = ANIMALS[ANIMALS.length - 1];
const editingAnimal = {
  id: ANIMAL.id,
  family: mock.family,
  color: mock.color,
  gender: mock.gender,
  size: mock.size,
  name: mock.name,
  imageUrl: mock.imageUrl,
  location: mock.location,
  tel: mock.tel,
  note: mock.note
} as unknown as LooseAnimal;

describe('update Animal', () => {
  const payload = { id: 999 } as LooseAnimal;
  it('return null when animal is not founded', async () => {
    const result = await updateAnimalById(payload, user.id);
    expect(result).toBe(null);
  });

  it('update animal', async () => {
    const { id, ...properties } = editingAnimal;
    await updateAnimalById(editingAnimal, user.id);
    const animal = await db.animal.findFirst({ where: { id } });
    Object.entries(properties).forEach(([key, value]) => {
      expect(animal![key as keyof Animal]).toBe(value);
    });
  });

  it('return animal', async () => {
    const result = await updateAnimalById(editingAnimal, user.id);
    expect(result).toBeTruthy();
  });
});
