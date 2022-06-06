import { getLocalStorage, setLocalStorage } from '~/utils/storage';

const PREFERENCE_KEY = 'Sound';
export const getShouldPlaySound = () => getLocalStorage(PREFERENCE_KEY);
export const setSoundPreference = (isOpen: boolean) =>
  setLocalStorage(PREFERENCE_KEY, isOpen);
