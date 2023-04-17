import type { DEFAULT_VALUE } from '~/constants/options';
import type { Family, Gender, Size } from 'server/entities/animal';
import type { DogColor } from '~/constants/dogs';
import type { CatColor } from '~/constants/cats';

export type DefaultValue = typeof DEFAULT_VALUE;

export type FamilyValue = Family | DefaultValue;
export type GenderValue = Gender | DefaultValue;
export type SizeValue = Size | DefaultValue;
export type ColorValue = DogColor | CatColor | DefaultValue;
