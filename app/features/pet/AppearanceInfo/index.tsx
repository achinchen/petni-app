import type { LoaderData } from '~/routes/pets/:id';
import { useLoaderData } from '@remix-run/react';
import { getIconByGenderAndFamily } from '~/utils';
import Icon from '~/components/common/Icon';
import Card from '~/components/common/Card';
import { GENDER_LABEL, ADAPT_ME_LABEL } from './constants';

export default function AppearanceInfo() {
  const { pet } = useLoaderData<LoaderData>();
  const { gender, family, color } = pet;
  const genderIcon = getIconByGenderAndFamily({ gender, family });
  const genderLabel = GENDER_LABEL[gender];

  return (
    <Card mb="3" py="2 md:6" font="medium">
      <div m="auto" flex="~" justify="between" max-w="at-sm:86">
        <div text="center">
          <div p="5" bg="gray-50" mb="1" border="rounded-1/2">
            <Icon icon="Note" w="6" />
          </div>
          {ADAPT_ME_LABEL}
        </div>
        <div text="center">
          <div p="5" bg="gray-50" mb="1" border="rounded-1/2">
            <Icon icon={genderIcon} w="6" />
          </div>
          {genderLabel}
        </div>
        <div text="center">
          <div p="4" bg="gray-50" mb="1" border="rounded-1/2">
            <Icon icon="ColorPaletteActive" w="8" />
          </div>
          {color}
        </div>
      </div>
    </Card>
  );
}
