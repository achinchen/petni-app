import { getLocalStorage, setLocalStorage } from '~/utils/storage';
import type { Animal } from '@prisma/client';

export type FavoriteId = Animal['id'];
export type FavoriteIdSet = Set<FavoriteId>;

const PREFERENCE_KEY = 'Favorites';
export const getFavoriteIdsPreference = () => getLocalStorage(PREFERENCE_KEY);
export const setFavoriteIdsPreference = (favoriteIds: FavoriteIdSet) =>
  setLocalStorage(PREFERENCE_KEY, JSON.stringify([...favoriteIds]));
