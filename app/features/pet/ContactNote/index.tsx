import { Gender, Family } from '~/constants';
import { getTelephoneLink, getAddressLink } from '~/utils';
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

export default function ContactNote() {
  const { tel, address, note } = PET;

  return (
    <Card flex="md:1" min-h="40">
      <Fragment>
        <address flex="~ col" font="medium">
          <a
            mb="2"
            href={getTelephoneLink(tel)}
            target="_blank"
            rel="noreferrer"
          >
            {tel}
          </a>
          <a
            mb="2"
            href={getAddressLink(address)}
            target="_blank"
            rel="noreferrer"
          >
            {address}
          </a>
        </address>
        {note}
      </Fragment>
    </Card>
  );
}
