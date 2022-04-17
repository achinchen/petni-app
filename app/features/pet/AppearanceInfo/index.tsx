import { Gender, Family } from '~/constants';
import Icon from '~/components/common/Icon';
import Card from '~/components/common/Card';
import { GENDER_LABEL, ADAPT_ME_LABEL } from '../constants';
import { getIconByGenderAndFamily } from '~/utils';
import image from '~/assets/images/placeholder.jpg';
import { Fragment } from 'react';

const PET = {
  id: 238721,
  code: 'W09C0429-03',
  gender: Gender.Female,
  family: Family.Dog,
  image,
  location: '桃園市新屋區',
  color: '虎斑白色',
  openAt: '2022.01.28',
  address: '桃園市新屋區永興里3鄰藻礁路1668號',
  tel: '03-4861760',
  note: '本站動物皆採現場互動面談後評估能否認養，不接受系統上的預約。',
  followers: 130
};

export default function AppearanceInfo() {
  const { gender, family, color } = PET;
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
