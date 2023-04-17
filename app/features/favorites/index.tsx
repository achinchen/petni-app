import type { Animal } from 'server/entities/animal';
import type { FavoriteIdSet } from '~/hooks/useFavorite/utils';
import { useEffect, useState } from 'react';
import { useFetcher } from '@remix-run/react';
import AnimalCards from '~/components/common/AnimalCards';
import { HeaderPortal } from '~/components/common/Layout/Header';
import { TITLE, SUBTITLE } from './constants';
import useFavorite from '~/hooks/useFavorite';
import { FETCHER_IDLE_STATE } from '~/constants/utils';
import Loading from '~/components/common/LoadingAnimation';

export default function Favorites() {
  const [animals, setAnimals] = useState<Animal[]>([]);

  const { ids, onDelete } = useFavorite();

  const fetcher = useFetcher();
  const isLoading = fetcher.state !== FETCHER_IDLE_STATE;

  const removeDeletedAnimals = (targetId: number) => {
    setAnimals((animals) => {
      return animals.filter(({ id }) => id !== targetId);
    });
  };

  const onDeleteAnimal = (targetId: number) => {
    onDelete(targetId);
    removeDeletedAnimals(targetId);
  };

  const fetchAnimals = (ids: FavoriteIdSet) => {
    const formData = new FormData();
    formData.set('json', JSON.stringify([...ids]));

    fetcher.submit(formData, {
      method: 'post',
      action: '/favorites?index',
      replace: false
    });
  };

  useEffect(() => {
    if (fetcher.data?.animals) setAnimals(fetcher.data.animals);
  }, [fetcher.data]);

  useEffect(() => {
    if (ids.size) fetchAnimals(ids);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  return (
    <main className="content-width" m="4 lg:auto">
      <HeaderPortal>
        <div m="auto" text="xl" font="bold">
          {TITLE}
        </div>
      </HeaderPortal>
      <div color="gray-450" mt="6" mb="5" text="base center" font="medium">
        {SUBTITLE}
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        Boolean(animals.length) && (
          <AnimalCards animals={animals} onDelete={onDeleteAnimal} />
        )
      )}
    </main>
  );
}
