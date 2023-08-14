import { Gender, Family } from 'server/entities/animal';
import { Bone, Fish, Female, Male } from '~/components/common/Icon';

export const ICON = {
  Bone,
  Fish,
  [Gender.Female]: Female,
  [Gender.Male]: Male
};

export const ICON_COLOR_CONFIG = {
  Bone: 'blue-350',
  Fish: 'status-active',
  [Gender.Female]: 'status-active',
  [Gender.Male]: 'blue-350'
};

export const getIconByGenderAndFamily = ({
  gender,
  family
}: {
  gender: Gender;
  family: Family;
}): { icon: string; color: string } => {
  const key = (
    Number(Gender[gender]) !== Gender.Null
      ? Gender[gender]
      : Number(Family[family]) === Family.Dog
      ? 'Bone'
      : 'Fish'
  ) as keyof typeof ICON;
  console.log(key);
  return {
    icon: ICON[key],
    color: ICON_COLOR_CONFIG[key]
  };
};
