import type { Family, Animal } from 'server/entities/animal';
import { FAMILY_LABEL } from '~/constants';

export const getAlt = (id: Animal['id'], family: Family) =>
  `No. ${id} ${FAMILY_LABEL[family]} 的照片`;
