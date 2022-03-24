import { Gender } from './constants';

export type PetCard = {
  id: number;
  image: string;
  gender: Gender;
  location: string;
};
