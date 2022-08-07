import type { Family, Animal } from '@prisma/client';
import { FAMILY_LABEL } from '~/constants';

export const getAlt = (id: Animal['id'], family: Family) =>
  `No. ${id} ${FAMILY_LABEL[family]} 的照片`;
