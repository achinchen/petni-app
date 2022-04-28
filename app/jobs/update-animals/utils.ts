import { PUBLIC_ADOPT_ANIMALS_API } from './constants';
import { Family, Gender, Size } from '@prisma/client';

type RawAnimal = {
  animal_id: number;
  animal_subid: string;
  animal_kind: string;
  animal_sex: string;
  animal_bodytype: string;
  animal_colour: string;
  animal_remark: string;
  animal_opendate: string;
  album_file: string;
  shelter_address: string;
  shelter_tel: string;
};

const fetchAnimals = async (): Promise<RawAnimal[]> => {
  const response = await fetch(PUBLIC_ADOPT_ANIMALS_API);
  const animals = await response.json();
  return animals as RawAnimal[];
};

const formatGender = (gender: string) => {
  switch (gender) {
    case 'M':
      return Gender.Male;
    case 'F':
      return Gender.Female;
    default:
      return Gender.Null;
  }
};

const formatSize = (size: string) => {
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

const formatFamily = (family: string) => {
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
    family: formatFamily(family),
    gender: formatGender(gender),
    size: formatSize(size),
    color,
    imageUrl,
    note,
    location: address.slice(0, 6),
    address,
    tel,
    openAt: new Date(openAt)
  };
};

export const getAnimals = async () => {
  const rawAnimal = await fetchAnimals();
  const animals = rawAnimal.map(formatAnimal);
  return animals;
};
