import type { RawAnimal } from './types';
import { Family, Gender, Size } from 'server/entities/animal';
import { installGlobals } from '@remix-run/node';
import { PUBLIC_ADOPT_ANIMALS_API } from './constants';

export const fetchAnimals = async (): Promise<RawAnimal[] | undefined> => {
  try {
    installGlobals();
    const response = await fetch(PUBLIC_ADOPT_ANIMALS_API);
    const animals = (await response.json()) as RawAnimal[];
    const availableAnimals = animals.filter(getIsAvailableAnimal);
    return availableAnimals;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getIsAvailableAnimal = ({
  animal_status,
  album_file
}: RawAnimal) => {
  return animal_status === 'OPEN' && Boolean(album_file);
};

export const formatGender = (gender: string) => {
  switch (gender) {
    case 'M':
      return Gender.Male;
    case 'F':
      return Gender.Female;
    default:
      return Gender.Null;
  }
};

export const formatSize = (size: string) => {
  switch (size) {
    case 'BIG':
      return Size.Large;
    case 'MEDIUM':
      return Size.Medium;
    case 'SMALL':
    default:
      return Size.Small;
  }
};

export const formatFamily = (family: string) => {
  switch (family) {
    case '貓':
      return Family.Cat;
    case '狗':
    default:
      return Family.Dog;
  }
};

export const formatAnimal = ({
  animal_id: id,
  animal_subid: code,
  animal_kind: family,
  animal_sex: gender,
  animal_bodytype: size,
  animal_colour: color,
  animal_remark: note,
  animal_opendate: openAt,
  album_file: imageUrl,
  shelter_address: address,
  shelter_tel: tel
}: RawAnimal) => {
  return {
    id,
    code,
    name: '',
    family: formatFamily(family),
    gender: formatGender(gender),
    size: formatSize(size),
    color,
    imageUrl,
    note,
    location: address.slice(0, 6),
    address,
    tel: tel.replace('分機', '#'),
    openAt: new Date(openAt),
    userId: null
  };
};

export const getAnimals = async () => {
  const rawAnimal = await fetchAnimals();
  if (!rawAnimal) return;
  const animals = rawAnimal.map(formatAnimal);
  return animals;
};
