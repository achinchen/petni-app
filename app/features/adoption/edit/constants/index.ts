import type { Gender } from 'server/entities/animal';

export const BUTTON = {
  SUBMIT: '發佈',
  UPDATE: '更新'
};

export const REQUIRED = '(*必填)';

export const REQUIRED_REMINDER = `標註為 ${REQUIRED} 的項目尚未填寫完成，請填寫完整後再發佈。`;

export const DEFAULT_GENDER_VALUE = Gender.Null;
