import type { Animal } from 'server/entities/animal';
import type { Animation } from './constants';
import { useState } from 'react';
import { Link } from '@remix-run/react';
import Icon, { Close, Info, Heart } from '~/components/common/Icon';
import IconButton from '~/components/common/IconButton';
import useSwipe from './hooks/useSwipe';
import useSound from '~/hooks/useSound';
import useFavorite from '~/hooks/useFavorite';
import { IMAGE_MISSING, PLACEHOLDER_IMG } from '~/constants/pet';
import { ANIMATION, FAMILY_SOUND, LABEL } from './constants';
import { getIconByGenderAndFamily } from '~/utils/icon';
import { getLabelById } from '~/features/pairing/Cards/PairingCard/utils';

type Props = {
  currentCard: Animal;
  onNext: () => void;
};

export default function FrontCard({ currentCard, onNext }: Props) {
  const [animation, setAnimation] = useState<Animation>();

  const { imageUrl, id, location, gender, family } = currentCard;

  const withImage = Boolean(imageUrl);
  const style = withImage ? { backgroundImage: `url(${imageUrl})` } : {};
  const genderIcon = getIconByGenderAndFamily({ gender, family });
  const { onPlay } = useSound();
  const { onAdd } = useFavorite();

  const onClose = () => {
    setAnimation(ANIMATION.CLOSE);
  };
  const onFavorite = () => {
    onAdd(id);
    setAnimation(ANIMATION.FAVORITE);
    onPlay(FAMILY_SOUND[family]);
  };
  const onAnimationEnd = () => {
    onNext();
    setAnimation(undefined);
  };

  useSwipe({
    onSwipeLeft: onClose,
    onSwipeRight: onFavorite
  });

  return (
    <div
      position="absolute"
      aria-label={getLabelById(id)}
      left="1/2"
      top="1/2"
      w="70vmin sm:56vmin md:80"
      h="100vmin sm:80vmin md:118"
      p="3"
      m="auto"
      bg="cover center gray-50"
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
      animate="count-1 mode-forwards"
      {...(animation && {
        animate: `${animation} count-1 mode-forwards`
      })}
      onAnimationEnd={onAnimationEnd}
    >
      <Link
        to={`/pets/${id}`}
        position="absolute"
        w="10 sm:13"
        top="4"
        right="4"
        transform="rotate-5"
      >
        <Icon
          role="presentation"
          icon={Info}
          color={withImage ? 'white' : 'dark'}
          size="xl"
          label={LABEL.INFO}
          text-shadow="icon"
        />
      </Link>
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
          label={LABEL.SKIP}
          flex="~"
          justify="center"
          items="center"
          w="10 sm:12"
          h="10 sm:12"
          border="rounded-1/2"
          shadow="default"
          icon={Close}
          iconOptions={{ size: 'base' }}
          onClick={onClose}
        />
        <div color={withImage ? `white` : 'black'} m="0">
          <span
            flex="~"
            justify="center"
            items="center"
            text="4.5"
            font="medium"
          >
            {id}
            <Icon label={LABEL.GENDER} ml="2" size="md" {...genderIcon} />
          </span>
          <div text="sm">{location}</div>
        </div>
        <IconButton
          label={LABEL.FAVORITE}
          flex="~"
          justify="center"
          items="center"
          w="10 sm:12"
          h="10 sm:12"
          border="rounded-1/2"
          shadow="default"
          icon={Heart}
          iconOptions={{
            size: 'md',
            color: 'status-active'
          }}
          onClick={onFavorite}
        />
      </div>
    </div>
  );
}
