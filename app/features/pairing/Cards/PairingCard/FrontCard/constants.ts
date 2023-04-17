import type { SoundType } from '~/hooks/useSound';
import { Family } from 'server/entities/animal';

export const ANIMATION = {
  CLOSE: 'close',
  FAVORITE: 'favorite'
} as const;

export type Animation = typeof ANIMATION[keyof typeof ANIMATION];

export const FAMILY_SOUND = {
  [Family.Cat]: 'cat',
  [Family.Dog]: 'dog'
} as { [key in Family]: SoundType };

export const LABEL = {
  INFO: '資訊',
  GENDER: '性別',
  FAVORITE: '喜歡',
  SKIP: '跳過'
};
