import { useReducer } from 'react';
import type {
  Family,
  Gender,
  Age,
  Color
} from '~/features/pairing/ControlPanel/Filter/type';
import { DEFAULT_OPTION } from '~/features/pairing/ControlPanel/constants/filter';

const DEFAULT_OPTION_VALUE = DEFAULT_OPTION.VALUE;

export type FilterState = {
  family: Family;
  gender: Gender;
  color: Color;
  age: Age;
};

type FilterType = keyof FilterState;
type Payload = ValueOf<FilterState>;
export type Action = {
  type: FilterType;
  value: Payload;
};

export const initialFilter = {
  family: DEFAULT_OPTION_VALUE,
  gender: DEFAULT_OPTION_VALUE,
  color: DEFAULT_OPTION_VALUE,
  age: DEFAULT_OPTION_VALUE
};

function filterReducer(state: FilterState, { type, value }: Action) {
  return { ...state, [type]: value };
}

export default function useFilterState() {
  const [filter, dispatchFilter] = useReducer(filterReducer, initialFilter);
  return { filter, dispatchFilter };
}
