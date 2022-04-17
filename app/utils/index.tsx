import type { IconType } from '~/components/common/Icon';
import { Gender, Family } from '~/constants';

export const getIconByFamily = (family: Family): IconType => {
  return family === Family.Dog ? 'Bone' : 'Fish';
};

export const getIconByGenderAndFamily = ({
  gender,
  family
}: {
  gender: Gender;
  family: Family;
}): IconType => {
  if (!gender) return getIconByFamily(family);
  return gender === Gender.Female ? 'Female' : 'Male';
};

export const getTelephoneLink = (telephone: string | string[]) => {
  const tel = Array.isArray(telephone) ? telephone[0] : telephone;
  return `tel:${tel.replace(' ', '')}`;
};

export const getAddressLink = (address: string) => {
  return `http://maps.google.com/maps?q=${address}`;
};
