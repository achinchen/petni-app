import type { AttributifyOptions } from '@unocss/preset-attributify';
import type { LoaderData } from '~/routes/pets/:id';
import { useLoaderData } from '@remix-run/react';
import { getIconByGenderAndFamily } from '~/utils/icon';
import useFavorite from '~/hooks/useFavorite';
import IconButton from '~/components/common/IconButton';
import Icon, { Heart, Edit } from '~/components/common/Icon';

type Props = AttributifyOptions;

const iconOptions = { size: 'md', color: 'status-active' };

export default function BaseInfo({ ...attributifyOptions }: Props) {
  const { pet } = useLoaderData<LoaderData>();
  const { id, location, gender, family, editable } = pet;
  const genderIcon = getIconByGenderAndFamily({ gender, family });

  const { ids, onAdd } = useFavorite({
    refresh: true
  });

  const onFavorite = () => {
    onAdd(id);
  };

  const alreadyFavorite = ids.has(id);

  return (
    <div flex="~" justify="between" py="md:4" {...attributifyOptions}>
      <div text="sm">
        <span flex="~" items="center" text="lg" font="medium">
          {id}
          <Icon display="md:none" size="base" ml="1" {...genderIcon} />
        </span>
        <div>{location}</div>
      </div>
      {editable ? (
        <IconButton
          to={`/adoption/${id}`}
          flex="~"
          justify="center"
          items="center"
          w="10 sm:12"
          h="10 sm:12"
          bg="white"
          border="rounded-1/2"
          shadow="default"
          icon={Edit}
          iconOptions={iconOptions}
        />
      ) : (
        <IconButton
          flex="~"
          justify="center"
          items="center"
          w="10 sm:12"
          h="10 sm:12"
          border="rounded-1/2"
          shadow="default"
          icon={Heart}
          iconOptions={iconOptions}
          onClick={onFavorite}
          disabled={alreadyFavorite}
        />
      )}
    </div>
  );
}
