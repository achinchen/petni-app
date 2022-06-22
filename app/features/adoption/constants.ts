import type { Family } from '@prisma/client';
import {
  FAMILY,
  GENDER,
  SIZE,
  COLOR,
  DEFAULT_VALUE
} from '~/constants/options';

export const TITLE = '送養';
export const BUTTON = {
  UPDATE_IMAGE: '替換照片',
  SUBMIT: '發佈'
};

export const DEFAULT_OPTION = {
  VALUE: DEFAULT_VALUE,
  LABEL: () => '不明'
};

export const REQUIRED = '(*必填)';

export const REQUIRED_REMINDER = `標註為 ${REQUIRED} 的項目尚未填寫完成，請填寫完整後再發佈。`;

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

export const CONTACT_OPTION = {
  LABEL: '聯絡方式',
  TEL_PLACEHOLDER: '聯絡方式 (電話、通訊等…)',
  CITY_PLACEHOLDER: '選擇縣市',
  DISTRICT_PLACEHOLDER: '選擇區別',
  REQUIRED: true
};

export const NOTE_OPTION = {
  LABEL: '狀況',
  PLACEHOLDER: '限 40 字',
  REQUIRED: false
};
