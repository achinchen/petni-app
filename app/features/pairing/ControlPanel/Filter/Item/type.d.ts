import type {
  Family,
  FamilyOptions,
  GenderOptions,
  SizeOptions,
  ColorOptions
} from '~/features/pairing/ControlPanel/Filter/type';
import type {
  DYNAMIC_FILTER_OPTIONS,
  GENERAL_FILTER_OPTIONS
} from '~/features/pairing/ControlPanel/constants/filter';

export type Category =
  | typeof GENERAL_FILTER_OPTIONS[number]['CATEGORY']
  | typeof DYNAMIC_FILTER_OPTIONS[number]['CATEGORY'];

export type Label =
  | typeof GENERAL_FILTER_OPTIONS[number]['LABEL']
  | typeof DYNAMIC_FILTER_OPTIONS[number]['LABEL'];

export type Options =
  | FamilyOptions
  | GenderOptions
  | SizeOptions
  | ColorOptions;
