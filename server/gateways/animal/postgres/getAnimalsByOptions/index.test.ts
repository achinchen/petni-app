import type { Options } from '.';
import getAnimalsByOptions from '.';
import getNearCitiesByCity from 'server/gateways/animal/utils/getNearCitiesByCity';
import { CITIES } from 'server/gateways/animal/utils/constants';
import {
  FILTERED_ANIMAL_COUNT,
  SEARCH_KEY_DIST
} from 'server/gateways/animal/constants';
import { EXISTED_ANIMALS } from 'spec/mock/constants/animal';
import { Family, Gender, Size } from 'server/entities/animal';
import { COLOR } from '~/constants/options';

jest.mock('./getNearCitiesByCity', () => {
  return jest.fn().mockReturnValue([]);
});

describe('getAnimalsByOptions', () => {
  const city = CITIES[0];
  it('return animals.length is equal with FILTERED_ANIMAL_COUNT', async () => {
    const animals = await getAnimalsByOptions({});
    expect(animals).toHaveLength(FILTERED_ANIMAL_COUNT);
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
        output: EXISTED_ANIMALS.filter(({ size }) => size === Size.Large)
      },
      {
        options: { gender: Gender.Male },
        output: EXISTED_ANIMALS.filter(({ gender }) => gender === Gender.Male)
      },
      {
        options: { color: COLOR.OPTIONS.Dog[1].VALUE, family: Family.Dog },
        output: EXISTED_ANIMALS.filter(
          ({ family, color }) =>
            family === Family.Dog &&
            color.match(SEARCH_KEY_DIST[Family.Dog].GOLD[0])
        )
      }
    ];

    for (const { options, output } of testCases) {
      const result = await getAnimalsByOptions(options as unknown as Options);
      expect(result).toEqual(output);
    }
  });
});
