import type { FilterState } from '~/features/pairing/ControlPanel/hooks/useFilterState';
import { getLocalStorage, setLocalStorage } from '~/utils/storage';

const KEY = {
  FILTER: 'Filter',
  LOCATION_CITY: 'LocationCity'
};

export const getFilter = () => getLocalStorage(KEY.FILTER);
export const setFilter = (payload: FilterState) =>
  setLocalStorage(KEY.FILTER, payload);

export const getLocationCity = () => getLocalStorage(KEY.LOCATION_CITY);
export const setLocationCity = (payload: string) =>
  setLocalStorage(KEY.LOCATION_CITY, payload);
