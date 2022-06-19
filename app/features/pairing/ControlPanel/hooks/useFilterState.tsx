import { useEffect, useReducer } from 'react';
import type {
  Family,
  Gender,
  Size,
  Color
} from '~/features/pairing/ControlPanel/Filter/type';
import { DEFAULT_OPTION } from '~/constants/options';
import { getFilterPreference } from '~/features/pairing/ControlPanel/utils';

const DEFAULT_OPTION_VALUE = DEFAULT_OPTION.VALUE;

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
  family: DEFAULT_OPTION_VALUE,
  gender: DEFAULT_OPTION_VALUE,
  color: DEFAULT_OPTION_VALUE,
  size: DEFAULT_OPTION_VALUE
};

function filterReducer(state: FilterState, { type, value }: Action) {
  return { ...state, [type]: value };
}

export default function useFilterState() {
  const [filter, dispatchFilter] = useReducer(filterReducer, initialFilter);

  useEffect(() => {
    const filterPreference = getFilterPreference();
    if (filterPreference)
      Object.keys(filterPreference).forEach((key) => {
        dispatchFilter({ type: key, value: filterPreference[key] } as Action);
      });
  }, []);

  return { filter, dispatchFilter };
}
