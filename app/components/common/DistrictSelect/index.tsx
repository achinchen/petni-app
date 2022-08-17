import { useState, useMemo } from 'react';
import SearchSelect from '~/components/common/SearchSelect';
import { formatCityInput, getInitCountryAndDistrict } from './utils';
import { COUNTRIES, DISTRICTS_BY_COUNTRIES, PLACEHOLDER } from './constants';

export type Payload = {
  country: string;
  district: string;
};

type Props = {
  location?: string;
  onFinish: ({ country, district }: Payload) => void;
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
    if (!country || !district) return;
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
        placeholder={PLACEHOLDER.COUNTRY}
        onSelect={onCountrySelect}
        formatFilterInput={formatCityInput}
      />
      <SearchSelect
        options={districtOptions}
        placeholder={PLACEHOLDER.DISTRICT}
        disabled={!country}
        initValue={district}
        onSelect={onDistrictSelect}
      />
    </fieldset>
  );
}
