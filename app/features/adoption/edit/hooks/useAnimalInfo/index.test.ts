import { getInitialAnimalInfo, INITIAL_ANIMAL_INFO } from '.';
import { ANIMAL } from 'spec/mock/constants/animal';

describe('getInitialAnimalInfo', () => {
  test('return INITIAL_ANIMAL_INFO when arg is undefined', () => {
    expect(getInitialAnimalInfo()).toBe(INITIAL_ANIMAL_INFO);
  });

  test('return animal when arg is animal', () => {
    expect(getInitialAnimalInfo(ANIMAL)).not.toBe(INITIAL_ANIMAL_INFO);
  });

  test('preset name when arg.name is null', () => {
    expect(getInitialAnimalInfo({ ...ANIMAL, name: null })).toHaveProperty(
      'name',
      ''
    );
  });
});
