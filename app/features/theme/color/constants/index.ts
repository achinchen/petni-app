import CharacterCat from '~/images/theme/character/cat.svg';
import CharacterDog from '~/images/theme/character/dog.svg';
import { CATS } from './cats';
import { DOGS } from './dogs';

export enum Family {
  Cat = 'CAT',
  Dog = 'DOG'
}

export const CHARACTER_IMAGE = {
  [Family.Dog]: CharacterDog,
  [Family.Cat]: CharacterCat
};

export const INFORMATION = {
  [Family.Dog]: DOGS,
  [Family.Cat]: CATS
};

export const FAMILY_LABEL = {
  [Family.Cat]: '喵星人',
  [Family.Dog]: '汪星人'
};
