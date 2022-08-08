import { Family, FAMILY_LABEL } from '~/constants';
import CharacterCat from '~/assets/images/theme/character/cat.svg';
import CharacterDog from '~/assets/images/theme/character/dog.svg';
import { CATS } from './cats';
import { DOGS } from './dogs';

export const CHARACTER_IMAGE = {
  [Family.Dog]: CharacterDog,
  [Family.Cat]: CharacterCat
};

export const INFORMATION = {
  [Family.Dog]: DOGS,
  [Family.Cat]: CATS
};

export { FAMILY_LABEL };
