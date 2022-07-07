import { useState, useMemo, useEffect } from 'react';
import SearchSelect from '~/components/common/SearchSelect';
import { COUNTRIES, DISTRICTS_BY_COUNTRIES } from './constants';

type Props = {
  onFinish: ({
    country,
    district
  }: {
    country: string;
    district: string;
  }) => void;
};

export default function DistrictSelection({ onFinish }: Props) {
  const [country, setCountry] = useState('');
  const [district, setDistrict] = useState('');

  const districtOptions = useMemo(
    () => DISTRICTS_BY_COUNTRIES[country] || [],
    [country]
  );

  const onDistrictSelect = (district: string) => {
    if (!country) return;
    setDistrict(district);
    onFinish({ country, district });
  };

  useEffect(() => {
    setDistrict('');
  }, [country]);

  return (
    <fieldset flex="~" gap="2">
      <SearchSelect
        options={COUNTRIES}
        placeholder="選擇城市"
        onSelect={setCountry}
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
