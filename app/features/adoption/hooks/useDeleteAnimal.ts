import type { AnimalId } from '~/models/animal/type';
import { useFetcher } from '@remix-run/react';
import { FETCHER_IDLE_STATE } from '~/constants/utils';

export default function useDeleteAnimal() {
  const fetcher = useFetcher();

  const isLoading = fetcher.state !== FETCHER_IDLE_STATE;

  const onDelete = (id: AnimalId) => {
    if (isLoading) return;
    const formData = new FormData();
    formData.set('id', String(id));

    fetcher.submit(formData, {
      method: 'delete',
      action: '/adoption?index',
      replace: false
    });
  };

  return {
    onDelete
  };
}
