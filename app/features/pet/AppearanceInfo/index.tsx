import type { LoaderData } from '~/routes/pets/:id';
import { useLoaderData } from '@remix-run/react';
import { getIconByGenderAndFamily } from '~/utils/icon';
import { ColorPlatte, Note } from '~/components/common/Icon';
import Card from '~/components/common/Card';
import LabelIcon from './LabelIcon';
import { getColorLabelByFamilyAndColor } from './utils';
import { GENDER_LABEL, ADAPT_ME_LABEL } from './constants';

export default function AppearanceInfo() {
  const { pet } = useLoaderData<LoaderData>();
  const { gender, family, color } = pet;
  const genderIcon = getIconByGenderAndFamily({ gender, family });
  const genderLabel = GENDER_LABEL[gender];
  const colorLabel = getColorLabelByFamilyAndColor({ color, family });

  return (
    <Card mb="3" py="2 md:6" font="medium">
      <div m="auto" flex="~" justify="between" max-w="at-sm:86">
        <LabelIcon color="status-active" icon={Note} label={ADAPT_ME_LABEL} />
        <LabelIcon {...genderIcon} label={genderLabel} />
        <LabelIcon
          color="status-active"
          icon={ColorPlatte}
          label={colorLabel}
        />
      </div>
    </Card>
  );
}
