import type { Family } from 'server/entities/animal';

export const getColorLabelByFamilyAndColor = ({
  color,
  family
}: {
  color: string;
  family: Family;
}): string => {
  return color;
};
