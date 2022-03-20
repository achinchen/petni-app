import { City, Area } from '~/features/hospital/constants';

export const getAreaIdByCity = (city: City): Area | '' => {
  switch (city) {
    case City.Taipei:
      return Area.Northern;
    case City.Taichung:
      return Area.Central;
    case City.Jiayi:
      return Area.Southern;
    case City.Hualian:
      return Area.Eastern;
    default:
      return '';
  }
};
