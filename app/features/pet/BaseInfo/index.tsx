import type { AttributifyOptions } from '@unocss/preset-attributify';
import type { LoaderData } from '~/routes/pets/:id';
import { useLoaderData } from '@remix-run/react';
import { getIconByGenderAndFamily } from '~/utils';
import useFavorite from '~/hooks/useFavorite';
import IconButton from '~/components/common/IconButton';
import Icon from '~/components/common/Icon';

type Props = AttributifyOptions;

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
        <span flex="~" text="lg" font="medium">
          {id}
          <Icon display="at-md:none" w="5" ml="1" icon={genderIcon} />
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
          icon="Edit"
          iconAttributifyOptions={{ w: 5 }}
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
          icon="LoveActiveFill"
          iconAttributifyOptions={{ w: 10 }}
          onClick={onFavorite}
          disabled={alreadyFavorite}
        />
      )}
    </div>
  );
}
