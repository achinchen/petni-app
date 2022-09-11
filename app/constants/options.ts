import type { DogColor } from '~/constants/dogs';
import type { CatColor } from '~/constants/cats';
import type { Props as IconProps } from '~/components/common/Icon';
import { Cat, Dog, Female, Male } from '~/components/common/Icon';
import { Family, Gender, Size, FAMILY_LABEL, GENDER_LABEL } from '~/constants';
import { DOG_COLOR_LABEL } from '~/constants/dogs';
import { CAT_COLOR_LABEL } from '~/constants/cats';

export const DOG_COLOR_OPTIONS = Object.entries(DOG_COLOR_LABEL).map(
  ([VALUE, LABEL]) => ({ VALUE: VALUE as DogColor, LABEL })
);

export const CAT_COLOR_OPTIONS = Object.entries(CAT_COLOR_LABEL).map(
  ([VALUE, LABEL]) => ({ VALUE: VALUE as CatColor, LABEL })
);

export const DEFAULT_VALUE = 'NONE' as const;

export const COLOR = {
  CATEGORY: 'color',
  OPTIONS: {
    [Family.Cat]: CAT_COLOR_OPTIONS,
    [Family.Dog]: DOG_COLOR_OPTIONS
  }
} as const;

export const FAMILY = {
  CATEGORY: 'family',
  OPTIONS: [
    {
      VALUE: Family.Cat,
      LABEL: (): IconProps => ({
        label: FAMILY_LABEL[Family.Cat],
        icon: Cat,
        size: 'md'
      })
    },
    {
      VALUE: Family.Dog,
      LABEL: (): IconProps => ({
        label: FAMILY_LABEL[Family.Dog],
        icon: Dog,
        size: 'md'
      })
    }
  ]
} as const;

export const GENDER = {
  CATEGORY: 'gender',
  OPTIONS: [
    {
      VALUE: Gender.Male,
      LABEL: (): IconProps => ({
        label: GENDER_LABEL[Gender.Male],
        icon: Male,
        size: 'base',
        color: 'blue-350'
      })
    },
    {
      VALUE: Gender.Female,
      LABEL: (): IconProps => ({
        label: GENDER_LABEL[Gender.Female],
        icon: Female,
        size: 'base',
        color: 'status-active'
      })
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
