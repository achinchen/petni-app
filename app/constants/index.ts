import { Family, Gender } from '@prisma/client';
export { Family, Gender, Size } from '@prisma/client';

export const APP_NAME = 'PetNi';

export const FAMILY_LABEL = {
  [Family.Cat]: '喵星人',
  [Family.Dog]: '汪星人'
};

export const GENDER_LABEL = {
  [Gender.Female]: '女生',
  [Gender.Male]: '男生'
};
