import { Hospital } from './types';

type Telephone = Hospital['TEL'];
type Address = Hospital['ADDRESS'];

export const getTelephoneLink = (telephone: Telephone) => {
  const tel = Array.isArray(telephone) ? telephone[0] : telephone;
  return `tel:${tel.replace(' ', '')}`;
};

export const getAddressLink = (address: Address) => {
  return `http://maps.google.com/maps?q=${address}`;
};
