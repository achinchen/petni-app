import getAnimalsByIds from './index.server';
import { db } from '~/utils/db/index.server';
import { ANIMALS } from 'spec/mock/constants/animal';

const ids = ANIMALS.map(({ id }) => id);

beforeAll(async () => {
  await db.animal.createMany({
    data: ANIMALS
  });
});

afterAll(async () => {
  const deleteAnimals = db.animal.deleteMany();
  await db.$transaction([deleteAnimals]);
  await db.$disconnect();
});

test('return SimpleAnimal', async () => {
  const animals = await getAnimalsByIds(ids);
  const animal = animals[0];
  const propertiesOfSimpleAnimal = [
    'id',
    'gender',
    'family',
    'location',
    'imageUrl'
  ];

  propertiesOfSimpleAnimal.forEach((property) => {
    expect(animal).toHaveProperty(property);
  });
});
