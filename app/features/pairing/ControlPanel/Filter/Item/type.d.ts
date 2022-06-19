import type {
  FamilyOptions,
  GenderOptions,
  SizeOptions,
  ColorOptions
} from '~/features/pairing/ControlPanel/Filter/type';
import type {
  GENERAL_FILTER_OPTIONS,
  DYNAMIC_FILTER_OPTIONS
} from '~/constants/options';

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
