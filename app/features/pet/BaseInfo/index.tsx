import { AttributifyOptions } from '@unocss/preset-attributify';
import { Form } from '@remix-run/react';
import { usePetContext } from '~/features/pet/context';
import { getIconByGenderAndFamily } from '~/utils';
import IconButton from '~/components/common/IconButton';
import Icon from '~/components/common/Icon';

type Props = AttributifyOptions;

export default function BaseInfo({ ...attributifyOptions }: Props) {
  const { pet } = usePetContext();
  const { id, location, gender, family } = pet!;
  const genderIcon = getIconByGenderAndFamily({ gender, family });

  return (
    <div flex="~" justify="between" py="md:4" {...attributifyOptions}>
      <div text="sm">
        <span flex="~" text="lg" font="medium">
          {id}
          <Icon display="at-md:none" w="5" icon={genderIcon} />
        </span>
        <div>{location}</div>
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
        onClick={() => {}}
      />
    </div>
  );
}
