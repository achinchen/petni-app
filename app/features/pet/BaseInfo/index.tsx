import { AttributifyOptions } from '@unocss/preset-attributify';
import { Gender, Family } from '~/constants';
import { getIconByGenderAndFamily } from '~/utils';
import IconButton from '~/components/common/IconButton';
import Icon from '~/components/common/Icon';
import image from '~/assets/images/placeholder.jpg';

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

type Props = AttributifyOptions;

export default function BaseInfo({ ...attributifyOptions }: Props) {
  const { id, location, gender, family } = PET;
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
