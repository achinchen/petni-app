import type {
  FamilyValue,
  GenderValue,
  SizeValue,
  ColorValue
} from '~/features/adoption/edit/types';
import type { Animal } from 'server/entities/animal';
import { useReducer } from 'react';
import { DEFAULT_VALUE } from '~/constants/options';

export type AnimalInfoState = {
  family: FamilyValue;
  gender: GenderValue;
  color: ColorValue;
  size: SizeValue;
  name: string;
};

type AnimalInfoType = keyof AnimalInfoState;
type Payload = ValueOf<AnimalInfoState>;

export type AnimalInfoAction = {
  type: AnimalInfoType;
  value: Payload;
};

export const INITIAL_ANIMAL_INFO = {
  family: DEFAULT_VALUE,
  gender: DEFAULT_VALUE,
  color: DEFAULT_VALUE,
  size: DEFAULT_VALUE,
  name: ''
};

export const getInitialAnimalInfo = (animal?: Animal): AnimalInfoState => {
  if (!animal) return INITIAL_ANIMAL_INFO;

  return {
    family: animal.family,
    gender: animal.gender,
    color: animal.color,
    size: animal.size,
    name: animal.name || ''
  } as unknown as AnimalInfoState;
};

function reducer(state: AnimalInfoState, { type, value }: AnimalInfoAction) {
  return { ...state, [type]: value };
}

export default function useAnimalInfo(animal?: Animal) {
  const [animalInfo, dispatchAnimalInfo] = useReducer(
    reducer,
    getInitialAnimalInfo(animal)
  );
  return { animalInfo, dispatchAnimalInfo };
}
