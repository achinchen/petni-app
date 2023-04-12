import { Family } from 'server/entities/animal';
import bone from '~/assets/images/placeholder/bone.png';
import fish from '~/assets/images/placeholder/fish.png';

export const IMAGE_MISSING = 'Oops！圖片暫時遺失';

export const PLACEHOLDER_IMG = {
  [Family.Dog]: bone,
  [Family.Cat]: fish
};
