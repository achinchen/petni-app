import { Gender, Family } from '@prisma/client';
import { Bone, Fish, Female, Male } from '~/components/common/Icon';

export const ICON = {
  Bone,
  Fish,
  Female,
  Male
};

export const ICON_COLOR_CONFIG = {
  Bone: 'blue-350',
  Fish: 'status-active',
  Female: 'status-active',
  Male: 'blue-350'
};

export const getIconByGenderAndFamily = ({
  gender,
  family
}: {
  gender: Gender;
  family: Family;
}): { icon: string; color: string } => {
  const key =
    gender !== Gender.Null ? gender : family === Family.Dog ? 'Bone' : 'Fish';
  return { icon: ICON[key], color: ICON_COLOR_CONFIG[key] };
};
