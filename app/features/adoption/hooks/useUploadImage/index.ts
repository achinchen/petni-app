import type { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import { FETCHER_IDLE_STATE } from '~/constants/utils';
import { setAdoptionImageUrl } from '~/features/adoption/utils';

export type Parameters = {
  onFinish: (url: string) => void;
};

export default function useUploadImage({ onFinish }: Parameters) {
  const fetcher = useFetcher();

  const onUpload = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    if (!files || !files.length) return;
    const image = files[0];
    const formData = new FormData();
    formData.set('image', image);

    fetcher.submit(formData, {
      method: 'post',
      encType: 'multipart/form-data',
      action: '/api/image/update?index',
      replace: false
    });
  };

  useEffect(() => {
    if (fetcher.data?.url) {
      const imageUrl = fetcher.data.url;
      setAdoptionImageUrl(imageUrl);
      onFinish(imageUrl);
    }
  }, [fetcher.data, onFinish]);

  return {
    isLoading: fetcher.state !== FETCHER_IDLE_STATE,
    onUpload
  };
}
