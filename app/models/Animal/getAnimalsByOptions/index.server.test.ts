import type { Options } from './index.server';
import getAnimalsByOptions from './index.server';
import getNearCitiesByCity from './getNearCitiesByCity';
import { ANIMAL_COUNT, CITIES, SEARCH_KEY_DIST } from './constants';
import { EXISTED_ANIMALS } from 'spec/mock/constants/animal';
import { Family, Gender, Size } from '@prisma/client';
import { COLOR } from '~/constants/options';

jest.mock('./getNearCitiesByCity', () => {
  return jest.fn().mockReturnValue([]);
});

describe('getAnimalsByOptions', () => {
  const city = CITIES[0];
  it('return animals.length is equal with ANIMAL_COUNT', async () => {
    const animals = await getAnimalsByOptions({});
    expect(animals).toHaveLength(ANIMAL_COUNT);
  });

  it('trigger getNearCitiesByCity when option.city is truthy', async () => {
    await getAnimalsByOptions({ city });
    expect(getNearCitiesByCity).toBeCalledWith(city);
  });

  it('return expected animals', async () => {
    const testCases = [
      {
        options: { family: Family.Cat },
        output: EXISTED_ANIMALS.filter(({ family }) => family === Family.Cat)
      },
      {
        options: { size: Size.Large },
        output: EXISTED_ANIMALS.filter(({ size }) => size.trim() === Size.Large)
      },
      {
        options: { gender: Gender.Male },
        output: EXISTED_ANIMALS.filter(({ gender }) => gender === Gender.Male)
      },
      {
        options: { color: COLOR.OPTIONS.Dog[1].VALUE, family: Family.Dog },
        output: EXISTED_ANIMALS.filter(
          ({ family, color }) =>
            family === Family.Dog && color.match(SEARCH_KEY_DIST.Dog.GOLD[0])
        )
      }
    ];

    for (const { options, output } of testCases) {
      const result = await getAnimalsByOptions(options as Options);
      expect(result).toEqual(output);
    }
  });
});
