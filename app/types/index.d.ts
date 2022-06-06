import type { Gender, Family } from '~/constants';
import type { CatColor } from '~/constants/cats';
import type { DogColor } from '~/constants/dogs';

export type DetailPetCard = {
  id: number;
  code: string;
  gender: Gender;
  family: Family;
  image?: string;
  location: string;
  color?: CatColor | DogColor;
  openDate: string;
  address: string;
  tel: string;
  note?: string;
  followers: number;
};
