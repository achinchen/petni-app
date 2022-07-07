import type {
  FamilyValue,
  GenderValue,
  SizeValue,
  ColorValue
} from '~/features/adoption/create/types';
import { useReducer } from 'react';
import { DEFAULT_VALUE } from '~/constants/options';

export type AnimalInfoState = {
  family: FamilyValue;
  gender: GenderValue;
  color: ColorValue;
  size: SizeValue;
};

type AnimalInfoType = keyof AnimalInfoState;
type Payload = ValueOf<AnimalInfoState>;

export type AnimalInfoAction = {
  type: AnimalInfoType;
  value: Payload;
};

export const initialAnimalInfo = {
  family: DEFAULT_VALUE,
  gender: DEFAULT_VALUE,
  color: DEFAULT_VALUE,
  size: DEFAULT_VALUE
};

function filterReducer(
  state: AnimalInfoState,
  { type, value }: AnimalInfoAction
) {
  return { ...state, [type]: value };
}

export default function useAnimalInfo() {
  const [animalInfo, dispatchAnimalInfo] = useReducer(
    filterReducer,
    initialAnimalInfo
  );
  return { animalInfo, dispatchAnimalInfo };
}
