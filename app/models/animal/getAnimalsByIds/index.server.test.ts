import getAnimalsByIds from './index.server';
import { EXISTED_ANIMALS } from 'spec/mock/constants/animal';

const ids = EXISTED_ANIMALS.map(({ id }) => id);

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
