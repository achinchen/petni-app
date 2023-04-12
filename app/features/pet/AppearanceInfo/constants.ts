import { Gender, Family } from 'server/entities/animal';
import { DOG_COLOR_LABEL } from '~/constants/dogs';
import { CAT_COLOR_LABEL } from '~/constants/cats';

export const FAMILY_COLOR_LABEL = {
  [Family.Dog]: DOG_COLOR_LABEL,
  [Family.Cat]: CAT_COLOR_LABEL
} as const;

export const ADAPT_ME_LABEL = '求包養';

export const GENDER_LABEL = {
  [Gender.Female]: '女生',
  [Gender.Male]: '男生',
  [Gender.Null]: '未知'
};
