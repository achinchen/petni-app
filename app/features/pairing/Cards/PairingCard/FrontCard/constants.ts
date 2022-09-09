import type { SoundType } from '~/hooks/useSound';
import { Family } from '@prisma/client';

export const ANIMATION = {
  CLOSE: 'close',
  FAVORITE: 'favorite'
} as const;

export type Animation = typeof ANIMATION[keyof typeof ANIMATION];

export const FAMILY_SOUND = {
  [Family.Cat]: 'cat',
  [Family.Dog]: 'dog'
} as { [key in Family]: SoundType };
