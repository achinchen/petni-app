import { Family } from '~/constants';
import {
  DEFAULT_VALUE,
  COLOR,
  FAMILY,
  GENDER,
  SIZE
} from '~/constants/options';

export const DEFAULT_OPTION = {
  VALUE: DEFAULT_VALUE,
  LABEL: '不拘'
} as const;

export const FAMILY_COLOR_OPTIONS = {
  [Family.Cat]: [...COLOR.OPTIONS[Family.Cat], DEFAULT_OPTION],
  [Family.Dog]: [...COLOR.OPTIONS[Family.Dog], DEFAULT_OPTION],
  [DEFAULT_OPTION.VALUE]: []
};

export const COLOR_OPTION = {
  CATEGORY: COLOR.CATEGORY,
  LABEL: '顏色',
  OPTIONS: (family: keyof typeof FAMILY_COLOR_OPTIONS) =>
    FAMILY_COLOR_OPTIONS[family]
} as const;

export const FAMILY_OPTION = {
  CATEGORY: FAMILY.CATEGORY,
  LABEL: '我想尋找',
  OPTIONS: [...FAMILY.OPTIONS, DEFAULT_OPTION]
} as const;

export const GENDER_OPTION = {
  CATEGORY: GENDER.CATEGORY,
  LABEL: '性別',
  OPTIONS: [...GENDER.OPTIONS, DEFAULT_OPTION]
} as const;

export const SIZE_OPTION = {
  CATEGORY: SIZE.CATEGORY,
  LABEL: '體型',
  OPTIONS: [...SIZE.OPTIONS, DEFAULT_OPTION]
} as const;

export const DYNAMIC_FILTER_OPTIONS = [COLOR_OPTION] as const;

export const GENERAL_FILTER_OPTIONS = [
  FAMILY_OPTION,
  GENDER_OPTION,
  SIZE_OPTION
] as const;
