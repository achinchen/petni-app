import getAnimalsByIds from './getManyByIds';
import { EXISTED_ANIMALS } from 'spec/mock/constants/animal';

const ids = EXISTED_ANIMALS.map(({ id }) => id);

test('return Animal[]', async () => {
  const animals = await getAnimalsByIds(ids);
  expect(animals).toHaveLength(ids.length);
});
