import type { Family } from '@prisma/client';
import {
  FAMILY,
  GENDER,
  SIZE,
  COLOR,
  DEFAULT_VALUE
} from '~/constants/options';
import { REQUIRED } from '~/features/adoption/constants';
export { REQUIRED };

export const DEFAULT_OPTION = {
  VALUE: DEFAULT_VALUE,
  LABEL: () => '不明'
};

export const FAMILY_OPTION = {
  CATEGORY: FAMILY.CATEGORY,
  OPTIONS: FAMILY.OPTIONS,
  LABEL: '種類',
  REQUIRED: true
};

export const GENDER_OPTION = {
  CATEGORY: GENDER.CATEGORY,
  OPTIONS: [...GENDER.OPTIONS, DEFAULT_OPTION],
  LABEL: '性別',
  REQUIRED: true
};

export const SIZE_OPTION = {
  ...SIZE,
  LABEL: '體型',
  REQUIRED: true
};

export const NAME_OPTION = {
  LABEL: '牠的名字',
  PLACEHOLDER: ' 若尚未取名可不填',
  REQUIRED: true
};

export const COLOR_OPTION = {
  LABEL: '毛色',
  OPTION: (family: Family) => COLOR.OPTION[family],
  REQUIRED: true
};
