import { useEffect } from 'react';
import { useCreateAdoptionContext } from '~/features/adoption/create/context';
import { getAdoptionImageUrl } from '~/features/adoption/utils';
import useUploadImage from '~/features/adoption/hooks/useUploadImage';
import { IMAGE_EXTENSION } from '~/features/adoption/constants';

const UPDATE_IMAGE = '替換照片';

export default function Photo() {
  const { imageUrl, setImageUrl } = useCreateAdoptionContext();

  const { onUpload, isLoading } = useUploadImage({ onFinish: setImageUrl });

  useEffect(() => {
    setImageUrl(getAdoptionImageUrl());
  }, [setImageUrl]);

  return (
    <div p="4" bg="md:white" border="rounded-3xl">
      <div
        w="52"
        h="70"
        border="rounded-2xl"
        bg="center cover"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <label
        htmlFor="image"
        display="flex"
        mt="3"
        justify="center"
        items="center"
        h="12.5"
        text="sm"
        bg="status-active"
        color="white"
        border="rounded-2xl"
        cursor="pointer"
        {...(isLoading && { style: { cursor: 'disabled' } })}
      >
        <input
          type="file"
          id="image"
          accept={IMAGE_EXTENSION}
          display="none"
          onChange={onUpload}
          disabled={isLoading}
        />

        {UPDATE_IMAGE}
      </label>
    </div>
  );
}
