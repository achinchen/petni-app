import type { FavoriteId, FavoriteIdSet } from './utils';
import { useEffect, useState } from 'react';
import { getFavoriteIdsPreference, setFavoriteIdsPreference } from './utils';

export default function useFavorite() {
  const [ids, setIds] = useState<FavoriteIdSet>(new Set());

  const onAdd = (targetId: FavoriteId) => {
    setIds((ids) => {
      ids.add(targetId);
      setFavoriteIdsPreference(ids);
      return ids;
    });
  };

  const onDelete = (targetId: FavoriteId) => {
    setIds((ids) => {
      ids.delete(targetId);
      setFavoriteIdsPreference(ids);
      return ids;
    });
  };

  useEffect(() => {
    const favoriteIds = getFavoriteIdsPreference();
    if (favoriteIds.length) setIds(new Set(favoriteIds));
  }, []);

  return {
    ids,
    onAdd,
    onDelete
  };
}
