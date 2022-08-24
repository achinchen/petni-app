import { getIsAvailableAnimal } from './index';
import { RAW_ANIMALS } from './mockData';

describe('basic', () => {
  const result = RAW_ANIMALS.filter(getIsAvailableAnimal);

  test('return only OPEN status', async () => {
    const status = result.map(({ animal_status }) => animal_status);
    status.forEach((state) => {
      expect(state).toBe('OPEN');
    });
  });

  test('return only truthy album_file', async () => {
    const files = result.map(({ album_file }) => album_file);
    files.forEach((file) => {
      expect(file).not.toBeFalsy();
    });
  });
});
