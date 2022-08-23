import type { SoundType } from '~/hooks/useSound';
import { SOUND } from '~/components/common/Layout/BackgroundSound/constants';
import { Family } from '@prisma/client';

export const ANIMATION = {
  CLOSE: 'close',
  FAVORITE: 'favorite'
} as const;

export type Animation = typeof ANIMATION[keyof typeof ANIMATION];

export const FAMILY_SOUND = {
  [Family.Cat]: SOUND.cat,
  [Family.Dog]: SOUND.dog
} as { [key in Family]: SoundType };
