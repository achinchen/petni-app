import {
  CITIES,
  DEFAULT_CITY_RANGE,
  OUTLYING_ISLAND_CITIES
} from './constants';

export default function getNearCitiesByCity(city: string) {
  if (OUTLYING_ISLAND_CITIES.includes(city)) return [city];

  let index = CITIES.indexOf(city);
  const { START, END } = DEFAULT_CITY_RANGE;

  if (!index) index += 1;

  const startIndex = index === -1 ? START : index - 1;
  const endIndex = index === -1 ? END : index + 1;

  const nearCities = CITIES.slice(startIndex, endIndex);
  return nearCities;
}
