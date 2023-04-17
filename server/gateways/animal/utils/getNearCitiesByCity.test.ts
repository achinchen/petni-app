import {
  CITIES,
  DEFAULT_CITY_RANGE,
  OUTLYING_ISLAND_CITIES
} from './constants';
import getNearCitiesByCity from './getNearCitiesByCity';

describe('getNearCitiesByCity', () => {
  it('return city only', () => {
    OUTLYING_ISLAND_CITIES.forEach((outlyingIslandCity) => {
      expect(getNearCitiesByCity(outlyingIslandCity)).toEqual([
        outlyingIslandCity
      ]);
    });
  });

  it('return cities', () => {
    const lastIndex = CITIES.length - 1;
    const testCases = [
      [CITIES[0], CITIES.slice(0, 2)],
      ['foo', CITIES.slice(DEFAULT_CITY_RANGE.START, DEFAULT_CITY_RANGE.END)],
      [CITIES[lastIndex], CITIES.slice(lastIndex - 1, lastIndex + 1)]
    ];

    testCases.forEach(([input, output]) => {
      expect(getNearCitiesByCity(input as string)).toEqual(output);
    });
  });
});
