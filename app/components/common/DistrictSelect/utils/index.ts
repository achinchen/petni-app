import { TAIWAN_COUNTRY_COUNT } from '~/components/common/DistrictSelect/constants';

export const getInitCountryAndDistrict = (location = '') => {
  if (!location) return ['', ''];
  return [
    location.slice(0, TAIWAN_COUNTRY_COUNT),
    location.slice(TAIWAN_COUNTRY_COUNT)
  ];
};

export const formatCityInput = (input: string) => input.replace('台', '臺');
