import type { DogColor } from '~/constants/dogs';
import type { CatColor } from '~/constants/cats';
import type { IconType } from '~/components/common/Icon';
import { Family, Gender, Size } from '~/constants';
import { DOG_COLOR_LABEL } from '~/constants/dogs';
import { CAT_COLOR_LABEL } from '~/constants/cats';

const DOG_COLOR_OPTIONS = Object.entries(DOG_COLOR_LABEL).map(
  ([VALUE, LABEL]) => ({ VALUE: VALUE as DogColor, LABEL })
);

const CAT_COLOR_OPTIONS = Object.entries(CAT_COLOR_LABEL).map(
  ([VALUE, LABEL]) => ({ VALUE: VALUE as CatColor, LABEL })
);

export const DEFAULT_OPTION = {
  VALUE: 'NONE',
  LABEL: '不拘'
} as const;

export const FAMILY_COLOR_OPTIONS = {
  [Family.Cat]: [...CAT_COLOR_OPTIONS, DEFAULT_OPTION],
  [Family.Dog]: [...DOG_COLOR_OPTIONS, DEFAULT_OPTION],
  [DEFAULT_OPTION.VALUE]: []
};

export const COLOR_OPTION = {
  CATEGORY: 'color',
  LABEL: '顏色',
  OPTIONS: (family: keyof typeof FAMILY_COLOR_OPTIONS) =>
    FAMILY_COLOR_OPTIONS[family]
} as const;

export const FAMILY_OPTION = {
  CATEGORY: 'family',
  LABEL: '我想尋找',
  OPTIONS: [
    {
      VALUE: Family.Cat,
      LABEL: (isPressed: boolean): IconType => (isPressed ? 'CatActive' : 'Cat')
    },
    {
      VALUE: Family.Dog,
      LABEL: (isPressed: boolean): IconType => (isPressed ? 'DogActive' : 'Dog')
    },
    DEFAULT_OPTION
  ]
} as const;

export const GENDER_OPTION = {
  CATEGORY: 'gender',
  LABEL: '性別',
  OPTIONS: [
    {
      VALUE: Gender.Male,
      LABEL: (): IconType => 'Male'
    },
    {
      VALUE: Gender.Female,
      LABEL: (): IconType => 'Female'
    },
    DEFAULT_OPTION
  ]
} as const;

export const SIZE_OPTION = {
  CATEGORY: 'size',
  LABEL: '體型',
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
    },
    DEFAULT_OPTION
  ]
} as const;
