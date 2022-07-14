import type { FilterState } from '~/features/pairing/ControlPanel/hooks/useFilterState';
import { getLocalStorage, setLocalStorage } from '~/utils/storage';

const PREFERENCE_KEY = 'Filter';
export const getFilterPreference = () => getLocalStorage(PREFERENCE_KEY);
export const setFilterPreference = (payload: FilterState) =>
  setLocalStorage(PREFERENCE_KEY, payload);
