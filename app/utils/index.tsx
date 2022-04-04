import type { IconType } from '~/components/icon';
import { Gender, Family } from '~/constants';

export const getIconByGenderAndFamily = ({
  gender,
  family
}: {
  gender: Gender;
  family: Family;
}): IconType => {
  if (!gender) return family === Family.Dog ? 'Bone' : 'Fish';
  return gender === Gender.Female ? 'Female' : 'Male';
};
