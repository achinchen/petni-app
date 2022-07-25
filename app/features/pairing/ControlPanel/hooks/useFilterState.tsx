import { useEffect, useReducer } from 'react';
import type {
  Family,
  Gender,
  Size,
  Color
} from '~/features/pairing/ControlPanel/Filter/type';
import { DEFAULT_VALUE } from '~/constants/options';
import { getFilter } from '~/features/pairing/ControlPanel/utils';

export type FilterState = {
  family: Family;
  gender: Gender;
  color: Color;
  size: Size;
};

type FilterType = keyof FilterState;
type Payload = ValueOf<FilterState>;
export type Action = {
  type: FilterType;
  value: Payload;
};

export const initialFilter = {
  family: DEFAULT_VALUE,
  gender: DEFAULT_VALUE,
  color: DEFAULT_VALUE,
  size: DEFAULT_VALUE
};

function filterReducer(state: FilterState, { type, value }: Action) {
  return { ...state, [type]: value };
}

export default function useFilterState() {
  const [filter, dispatchFilter] = useReducer(filterReducer, initialFilter);

  useEffect(() => {
    const filterPreference = getFilter();
    if (filterPreference)
      Object.keys(filterPreference).forEach((key) => {
        dispatchFilter({ type: key, value: filterPreference[key] } as Action);
      });
  }, []);

  return { filter, dispatchFilter };
}
