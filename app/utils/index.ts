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

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}.${padDate(month)}.${padDate(day)}`;
};
