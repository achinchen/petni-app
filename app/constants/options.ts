import type { DogColor } from '~/constants/dogs';
import type { CatColor } from '~/constants/cats';
import type { IconType } from '~/components/common/Icon';
import { Family, Gender, Size } from '~/constants';
import { DOG_COLOR_LABEL } from '~/constants/dogs';
import { CAT_COLOR_LABEL } from '~/constants/cats';

export const DOG_COLOR_OPTIONS = Object.entries(DOG_COLOR_LABEL).map(
  ([VALUE, LABEL]) => ({ VALUE: VALUE as DogColor, LABEL })
);

export const CAT_COLOR_OPTIONS = Object.entries(CAT_COLOR_LABEL).map(
  ([VALUE, LABEL]) => ({ VALUE: VALUE as CatColor, LABEL })
);

export const DEFAULT_VALUE = 'NONE';

export const COLOR = {
  CATEGORY: 'color',
  OPTION: {
    [Family.Cat]: CAT_COLOR_OPTIONS,
    [Family.Dog]: DOG_COLOR_OPTIONS
  }
} as const;

export const FAMILY = {
  CATEGORY: 'family',
  OPTIONS: [
    {
      VALUE: Family.Cat,
      LABEL: (isPressed: boolean): IconType => (isPressed ? 'CatActive' : 'Cat')
    },
    {
      VALUE: Family.Dog,
      LABEL: (isPressed: boolean): IconType => (isPressed ? 'DogActive' : 'Dog')
    }
  ]
};

export const GENDER = {
  CATEGORY: 'gender',
  OPTIONS: [
    {
      VALUE: Gender.Male,
      LABEL: (): IconType => 'Male'
    },
    {
      VALUE: Gender.Female,
      LABEL: (): IconType => 'Female'
    }
  ]
} as const;

export const SIZE = {
  CATEGORY: 'size',
  OPTIONS: [
    {
      VALUE: Size.Small,
      LABEL: '小'
    },
    {
      VALUE: Size.Medium,
      LABEL: '中'
    },
    {
      VALUE: Size.Large,
      LABEL: '大'
    }
  ]
} as const;
