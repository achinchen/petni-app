import type {
  FAMILY_OPTION,
  GENDER_OPTION,
  SIZE_OPTION,
  FAMILY_COLOR_OPTIONS
} from '~/features/pairing/ControlPanel/constants/filter';

export type FamilyOptions = typeof FAMILY_OPTION.OPTIONS;
export type GenderOptions = typeof GENDER_OPTION.OPTIONS;
export type SizeOptions = typeof SIZE_OPTION.OPTIONS;
export type ColorOptions = typeof FAMILY_COLOR_OPTIONS[Family];

export type Family = FamilyOptions[number]['VALUE'];
export type Gender = GenderOptions[number]['VALUE'];
export type Size = SizeOptions[number]['VALUE'];
export type Color = ColorOptions[number]['VALUE'];
