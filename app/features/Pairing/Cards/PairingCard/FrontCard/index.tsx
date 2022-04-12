import { useState } from 'react';
import Icon from '~/components/common/Icon';
import IconButton from '~/components/common/IconButton';
import useSwipe from '~/features/pairing/hooks/useSwipe';
import useSound, { SoundType } from '~/hooks/useSound';
import { getMockPet } from '../../utils';
import { IMAGE_MISSING, PLACEHOLDER_IMG } from './constants';
import { getIconByGenderAndFamily } from '~/utils';

export default function FrontCard() {
  const [animation, setAnimation] = useState<'close' | 'favorite'>();

  const { image, id, location, gender, family } = getMockPet();
  const withImage = Boolean(image);
  const style = withImage ? { backgroundImage: `url(${image})` } : {};
  const genderIcon = getIconByGenderAndFamily({ gender, family });
  const onPlay = useSound();

  const onClose = () => {
    setAnimation('close');
  };
  const onFavorite = () => {
    setAnimation('favorite');
    onPlay((family ? family.toLowerCase() : 'general') as SoundType);
  };
  const onAnimationEnd = () => {
    setAnimation(undefined);
  };

  useSwipe({
    onSwipeLeft: onClose,
    onSwipeRight: onFavorite
  });

  return (
    <div
      position="absolute"
      left="1/2"
      top="1/2"
      w="70vmin sm:56vmin md:80"
      h="100vmin sm:80vmin md:118"
      p="3"
      m="auto"
      bg="cover gray-50"
      overflow="hidden"
      border="rounded-12 12 white"
      shadow="card"
      transform="rotate--5 translate-x--1/2 translate-y--1/2"
      flex="~ col"
      after="
        position-absolute
        left-0
        bottom-0
        h-1/3
        w-100%
        content-empty
        bg-gradient-to-b
        from-transparent
        via-black/80
        to-black
        z--1"
      {...(!withImage && { after: 'display-none' })}
      transform-origin="left"
      style={style}
      animate="duration-0.4s count-1 mode-forwards"
      {...(animation && {
        animate: `${animation} duration-0.4s count-1 mode-forwards`
      })}
      onAnimationEnd={onAnimationEnd}
    >
      <Icon
        position="absolute"
        role="button"
        icon={withImage ? 'Info' : 'InfoDark'}
        w="10 sm:13"
        top="4"
        right="4"
        transform="rotate-5"
        cursor="pointer"
      />
      {!withImage && (
        <figure flex="~ col" items="center" mt="50%">
          <img src={PLACEHOLDER_IMG[family]} alt={IMAGE_MISSING} w="16" />
          <figcaption text="base" mt="2" color="status-general">
            {IMAGE_MISSING}
          </figcaption>
        </figure>
      )}
      <div
        mt="auto"
        mb="3"
        mx="auto"
        w="100%"
        max-w="80"
        flex="~"
        justify="between"
        items="center"
        transform="rotate-5"
      >
        <IconButton
          flex="~"
          justify="center"
          items="center"
          w="10 sm:12"
          h="10 sm:12"
          border="rounded-1/2"
          shadow="default"
          icon="Close"
          iconAttributifyOptions={{ w: 7 }}
          onClick={onClose}
        />
        <div color={withImage ? `white` : 'black'} m="0">
          <span flex="~" text="4.5" font="medium">
            {id}
            <Icon ml="2" icon={genderIcon} />
          </span>
          <div text="sm">{location}</div>
        </div>
        <IconButton
          flex="~"
          justify="center"
          items="center"
          w="10 sm:12"
          h="10 sm:12"
          border="rounded-1/2"
          shadow="default"
          icon="LoveActiveFill"
          iconAttributifyOptions={{ w: 10 }}
          onClick={onFavorite}
        />
      </div>
    </div>
  );
}
