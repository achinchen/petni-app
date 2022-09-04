import type { User as UserType } from '@prisma/client';
import type { Animal } from '@prisma/client';
import type { EditingAnimal } from '~/models/animal/type';
import { db } from '~/utils/db/index.server';
import { User } from 'spec/__mock__/constants/user';
import { ANIMAL, ANIMALS } from 'spec/__mock__/constants/animal';
import updateAnimalById from './index.server';

let user: UserType;
beforeAll(async () => {
  const { id, ...payload } = User;
  user = await db.user.create({ data: payload });
  await db.animal.create({ data: { ...ANIMAL, userId: user.id } });
});

afterAll(async () => {
  const deleteUser = db.user.deleteMany();
  const deleteAnimal = db.animal.deleteMany();
  await db.$transaction([deleteAnimal, deleteUser]);
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
} as EditingAnimal;

describe('update Animal', () => {
  const payload = { id: 999 } as EditingAnimal;
  it('return null when animal is not founded', async () => {
    const result = await updateAnimalById(payload, user);
    expect(result).toBe(null);
  });

  it('update animal', async () => {
    const { id, ...properties } = editingAnimal;
    await updateAnimalById(editingAnimal, user);
    const animal = await db.animal.findFirst({ where: { id } });
    Object.entries(properties).forEach(([key, value]) => {
      expect(animal![key as keyof Animal]).toBe(value);
    });
  });

  it('return animal', async () => {
    const result = await updateAnimalById(editingAnimal, user);
    expect(result).toBeTruthy();
  });
});
