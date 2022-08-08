import type { MouseEvent } from 'react';
import type { LoaderData } from '~/routes/pets/:id';
import { useLoaderData } from '@remix-run/react';
import { IMAGE_MISSING, PLACEHOLDER_IMG } from '~/constants/pet';
import { getAlt } from './utils';

type Props = {
  children?: JSX.Element;
};

export default function Photo({ children }: Props) {
  const { pet } = useLoaderData<LoaderData>();
  const { id, imageUrl, family } = pet!;
  const withImage = Boolean(imageUrl);
  const style = withImage ? { backgroundImage: `url(${imageUrl})` } : {};

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) event.preventDefault();
    if (withImage) window.open(imageUrl, '_blank');
  };

  const alt = withImage ? getAlt(id, family) : '';

  return (
    <div
      flex="~ col"
      position="relative"
      top="0"
      left="0"
      w="screen lg:107"
      h="40vh lg:145"
      max-h="sm:150"
      p="3"
      mr="4"
      bg="center gray-50"
      overflow="hidden"
      border="none lg:rounded-8 lg:12 white"
      shadow="default"
      onClick={onClick}
      role="presentation"
      aria-label={alt}
      after="
        position-absolute
        left-0
        bottom-0
        h-1/3
        w-100%
        content-empty
        bg-gradient-to-b
        from-transparent
        via-black/50
        lg:via-black/50
        to-black"
      {...(!withImage && { after: 'display-none' })}
      style={style}
    >
      {!withImage && (
        <figure flex="~ col" items="center" m="auto">
          <img src={PLACEHOLDER_IMG[family]} alt={IMAGE_MISSING} w="16" />
          <figcaption text="base" mt="2" color="status-general">
            {IMAGE_MISSING}
          </figcaption>
        </figure>
      )}
      {children}
    </div>
  );
}
