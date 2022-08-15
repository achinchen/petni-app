import { useEffect } from 'react';
import { useEditAdoptionContext } from '~/features/adoption/edit/context';
import { getAdoptionImageUrl } from '~/features/adoption/utils';
import useUploadImage from '~/features/adoption/hooks/useUploadImage';
import { IMAGE_EXTENSION } from '~/features/adoption/constants';
import { FAMILY_LABEL } from '~/constants';
import { DEFAULT_VALUE } from '~/constants/options';

export const UPDATE_IMAGE = '替換照片';

export default function Photo() {
  const { imageUrl, setImageUrl, animalInfo } = useEditAdoptionContext();

  const { family, name } = animalInfo;
  const alt =
    family === DEFAULT_VALUE
      ? `送養動物的照片`
      : `${name}${FAMILY_LABEL[family]}的照片`;
  const { onUpload, isLoading } = useUploadImage({ onFinish: setImageUrl });

  useEffect(() => {
    setImageUrl(getAdoptionImageUrl());
  }, [setImageUrl]);

  return (
    <div p="4" bg="md:white" border="rounded-3xl">
      <figure w="52" h="70">
        <img w="100%" h="100%" border="rounded-2xl" src={imageUrl} alt={alt} />
      </figure>
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
