import type { Family } from 'server/entities/animal';
import { FAMILY_COLOR_LABEL } from './constants';

type FamilyColorKey = keyof typeof FAMILY_COLOR_LABEL[Family];

export const getColorLabelByFamilyAndColor = ({
  color,
  family
}: {
  color: string;
  family: Family;
}): string => {
  return (
    FAMILY_COLOR_LABEL[family][color as unknown as FamilyColorKey] || color
  );
};
