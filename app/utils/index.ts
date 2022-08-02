import type { IconType } from '~/components/common/Icon';
import { Gender, Family } from '@prisma/client';

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
  if (gender === Gender.Null) return getIconByFamily(family);
  return gender;
};

export const getTelephoneLink = (telephone: string | string[]) => {
  const tel = Array.isArray(telephone) ? telephone[0] : telephone;
  return `tel:${tel.replace(/ /g, '')}`;
};

export const getAddressLink = (address: string) => {
  return `http://maps.google.com/maps?q=${address}`;
};

const padDate = (date: number) => {
  return `${date}`.padStart(2, '0');
};

export const formatDate = (inputDate: Date) => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}.${padDate(month)}.${padDate(day)}`;
};
