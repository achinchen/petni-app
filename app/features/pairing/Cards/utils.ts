import { Gender, Family } from '~/constants';
import image from '~/assets/images/placeholder.jpg';

export function getMockPet(index = 0) {
  return {
    id: 238721 + index,
    code: 'W09C0429-03',
    gender: Gender.Female,
    family: Family.Dog,
    image,
    location: '桃園市新屋區',
    color: '虎斑白色',
    openDate: '2022.01.28',
    address: '桃園市新屋區永興里3鄰藻礁路1668號',
    tel: '03-4861760',
    note: '本站動物皆採現場互動面談後評估能否認養，不接受系統上的預約。',
    follows: 130
  };
}
