import type { City } from '~/features/hospital/constants';
import { getAreaIdByCity } from './utils';

type Props = {
  city: City;
};

export default function HospitalAreaHashId({ city }: Props) {
  const areaId = getAreaIdByCity(city);
  if (!areaId) return null;
  return <div id={areaId} data-area-hash />;
}
