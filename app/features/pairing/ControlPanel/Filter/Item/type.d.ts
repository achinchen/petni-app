import type {
  FamilyOptions,
  GenderOptions,
  AgeOptions,
  ColorOptions
} from '~/features/pairing/ControlPanel/Filter/type';

import {
  GENERAL_FILTER_OPTIONS,
  DYNAMIC_FILTER_OPTIONS
} from '~/features/pairing/ControlPanel/Filter/constants';

export type Category =
  | typeof GENERAL_FILTER_OPTIONS[number]['CATEGORY']
  | typeof DYNAMIC_FILTER_OPTIONS[number]['CATEGORY'];

export type Label =
  | typeof GENERAL_FILTER_OPTIONS[number]['LABEL']
  | typeof DYNAMIC_FILTER_OPTIONS[number]['LABEL'];

export type Options = FamilyOptions | GenderOptions | AgeOptions | ColorOptions;
