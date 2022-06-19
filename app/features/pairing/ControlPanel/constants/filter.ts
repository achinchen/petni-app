import {
  COLOR_OPTION,
  FAMILY_OPTION,
  GENDER_OPTION,
  SIZE_OPTION
} from '~/constants/options';

export const DYNAMIC_FILTER_OPTIONS = [COLOR_OPTION] as const;

export const GENERAL_FILTER_OPTIONS = [
  FAMILY_OPTION,
  GENDER_OPTION,
  SIZE_OPTION
] as const;
