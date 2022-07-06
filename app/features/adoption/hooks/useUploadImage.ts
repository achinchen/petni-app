import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';

export default function useUploadImage() {
  const fetcher = useFetcher();
  const [url, setUrl] = useState('');

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
      setUrl(fetcher.data.url);
      console.log(fetcher.data.url);
    }
  }, [fetcher.data]);

  return {
    fetcher,
    url,
    onUpload
  };
}
