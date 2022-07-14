import { getLocalStorage, setLocalStorage } from '~/utils/storage';

const PREFERENCE_KEY = 'AdoptionImageUrl';
export const getAdoptionImageUrl = () => getLocalStorage(PREFERENCE_KEY);
export const setAdoptionImageUrl = (url: string) =>
  setLocalStorage(PREFERENCE_KEY, url);
