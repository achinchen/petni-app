import { Gender, Family } from '~/constants';
import Card from '~/components/common/Card';
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

export default function Metadata() {
  const { code, followers, openAt } = PET;

  return (
    <Card flex="~ col sm:row" justify="between" color="gray-450" mb="3">
      <Fragment>
        <div>
          <div text="xl" font="medium" color="black">
            {code}
          </div>
          <div>{openAt}</div>
        </div>
        <div flex="~ col" text="sm:right">
          <span text="xl" font="medium" color="black">
            {followers}
          </span>
          followers
        </div>
      </Fragment>
    </Card>
  );
}
