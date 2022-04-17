import { Gender, Family } from '~/constants';
import { IMAGE_MISSING, PLACEHOLDER_IMG } from '~/constants/pet';
import BaseInfo from './BaseInfo';
import Metadata from './Metadata';
import AppearanceInfo from './AppearanceInfo';
import ContactNote from './ContactNote';
import Photo from './Photo';
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

export default function Pet() {
  const { image } = PET;
  const withImage = Boolean(image);

  return (
    <main flex="~ col md:row" justify="center" m="md:4 lg:10" h="md:145">
      <Photo>
        <BaseInfo
          display="md:none"
          mt="auto"
          z="2"
          color={withImage ? 'white' : 'black'}
        />
      </Photo>
      <div m="4 md:0" flex="~ col" max-w="lg:100" text="sm">
        <BaseInfo display="lt-md:none" />
        <Metadata />
        <AppearanceInfo />
        <ContactNote />
      </div>
    </main>
  );
}
