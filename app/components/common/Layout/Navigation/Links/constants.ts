import {
  Cards,
  OutlineHeart,
  ColorPlatte,
  MedicalBriefCase,
  Collar
} from '~/components/common/Icon';

export const ACTIONS = [
  {
    to: '/',
    label: '配對',
    icon: Cards
  },
  {
    to: '/favorites',
    label: '收藏',
    icon: OutlineHeart
  },
  {
    to: '/theme/color',
    label: '主題館',
    icon: ColorPlatte
  },
  {
    to: '/adoption',
    label: '送養',
    icon: Collar
  },
  {
    to: '/hospital',
    label: '急診',
    icon: MedicalBriefCase
  }
];
