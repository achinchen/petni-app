import type { Pet } from '~/features/pet/types';
import { ANIMALS } from './animal';

export const PETS = ANIMALS.map((animal) => ({
  ...animal,
  follows: 0,
  userId: 1
})) as Pet[];

export const PET = PETS[0];
