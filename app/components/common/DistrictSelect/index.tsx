import { useState, useMemo } from 'react';
import SearchSelect from '~/components/common/SearchSelect';
import {
  TAIWAN_COUNTRY_COUNT,
  COUNTRIES,
  DISTRICTS_BY_COUNTRIES
} from './constants';

export type Payload = {
  country: string;
  district: string;
};

type Props = {
  location?: string;
  onFinish: ({ country, district }: Payload) => void;
};

const getInitCountryAndDistrict = (location = '') => {
  if (!location) return ['', ''];
  return [
    location.slice(0, TAIWAN_COUNTRY_COUNT),
    location.slice(TAIWAN_COUNTRY_COUNT)
  ];
};

export default function DistrictSelection({ location, onFinish }: Props) {
  const [initCountry, initDistrict] = useMemo(
    () => getInitCountryAndDistrict(location),
    [location]
  );

  const [country, setCountry] = useState(initCountry);
  const [district, setDistrict] = useState(initDistrict);

  const districtOptions = useMemo(
    () => DISTRICTS_BY_COUNTRIES[country] || [],
    [country]
  );

  const onDistrictSelect = (district: Payload['district']) => {
    if (!country) return;
    setDistrict(district);
    onFinish({ country, district });
  };

  const onCountrySelect = (country: Payload['country']) => {
    setCountry((prevCountry) => {
      if (prevCountry !== country) setDistrict('');
      return country;
    });
  };

  return (
    <fieldset flex="~" gap="2">
      <SearchSelect
        initValue={country}
        options={COUNTRIES}
        placeholder="選擇城市"
        onSelect={onCountrySelect}
      />
      <SearchSelect
        options={districtOptions}
        placeholder="選擇地區"
        disabled={!country}
        initValue={district}
        onSelect={onDistrictSelect}
      />
    </fieldset>
  );
}
