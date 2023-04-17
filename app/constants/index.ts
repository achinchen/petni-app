import { Family, Gender } from 'server/entities/animal';
export { Family, Gender, Size } from 'server/entities/animal';

export const APP_NAME = 'PetNi';

export const FAMILY_LABEL = {
  [Family.Cat]: '喵星人',
  [Family.Dog]: '汪星人'
};

export const GENDER_LABEL = {
  [Gender.Female]: '女生',
  [Gender.Male]: '男生'
};
