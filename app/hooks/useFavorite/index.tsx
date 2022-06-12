import type { FavoriteId, FavoriteIdSet } from './utils';
import { useEffect, useState } from 'react';
import { getFavoriteIdsPreference, setFavoriteIdsPreference } from './utils';
import { useFetcher } from '@remix-run/react';

type Parameters = {
  refresh?: boolean;
};

export default function useFavorite({ refresh }: Parameters) {
  const [ids, setIds] = useState<FavoriteIdSet>(new Set());
  const fetcher = useFetcher();

  const createFollow = async (targetId: FavoriteId) => {
    const formData = new FormData();
    formData.set('json', JSON.stringify(targetId));

    fetcher.submit(formData, {
      method: 'patch',
      action: '/api/follow?index',
      replace: false
    });
  };

  const onAdd = async (targetId: FavoriteId) => {
    setIds((ids) => {
      ids.add(targetId);
      setFavoriteIdsPreference(ids);
      return ids;
    });

    await createFollow(targetId);
  };

  const onDelete = (targetId: FavoriteId) => {
    setIds((ids) => {
      ids.delete(targetId);
      setFavoriteIdsPreference(ids);
      return ids;
    });
  };

  useEffect(() => {
    if (fetcher.data && refresh) window.location.reload();
  }, [fetcher.data, refresh]);

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
