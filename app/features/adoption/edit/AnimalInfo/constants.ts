import { FAMILY, GENDER, SIZE, COLOR } from '~/constants/options';
import { DEFAULT_GENDER_VALUE } from '~/features/adoption/edit/constants';

export const DEFAULT_GENDER_OPTION = {
  VALUE: DEFAULT_GENDER_VALUE,
  LABEL: () => ({
    label: '不明',
    icon: ''
  })
};

export const FAMILY_OPTION = {
  CATEGORY: FAMILY.CATEGORY,
  OPTIONS: FAMILY.OPTIONS,
  LABEL: '種類'
};

export const GENDER_OPTION = {
  CATEGORY: GENDER.CATEGORY,
  OPTIONS: [...GENDER.OPTIONS, DEFAULT_GENDER_OPTION],
  LABEL: '性別'
};

export const SIZE_OPTION = {
  ...SIZE,
  LABEL: '體型'
};

export const NAME_OPTION = {
  LABEL: '牠的名字',
  CATEGORY: 'name',
  PLACEHOLDER: '若尚未取名可不填'
};

export const COLOR_OPTION = {
  ...COLOR,
  LABEL: '毛色'
};
