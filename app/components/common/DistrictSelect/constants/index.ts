import COUNTRIES_DISTRICTS from './taiwan.json';

type Country = typeof COUNTRIES[number];

export const COUNTRIES = COUNTRIES_DISTRICTS.map(({ country }) => country);

export const DISTRICTS_BY_COUNTRIES: { [key in Country]: string[] } =
  COUNTRIES_DISTRICTS.reduce((collection, { country, districts }) => {
    return Object.assign(collection, {
      [country]: districts.map(({ district }) => district)
    });
  }, {});