import { useReducer } from 'react';
import type { Family, Gender, Age, Color } from './type';
import FilterItem from '~/features/Pairing/Panel/FilterItem';
import {
  DEFAULT_OPTION,
  GENERAL_FILTER_OPTIONS,
  COLOR_OPTION
} from './constants';

const DEFAULT_OPTION_VALUE = DEFAULT_OPTION.VALUE;

type Filter = {
  family: Family;
  gender: Gender;
  color: Color;
  age: Age;
};

const initialFilter = {
  family: DEFAULT_OPTION_VALUE,
  gender: DEFAULT_OPTION_VALUE,
  color: DEFAULT_OPTION_VALUE,
  age: DEFAULT_OPTION_VALUE
};

type FilterType = keyof Filter;
type Payload = ValueOf<Filter>;
type Action = {
  type: FilterType;
  value: Payload;
};

function filterReducer(state: Filter, { type, value }: Action) {
  return { ...state, [type]: value };
}

export default function FilterPanel() {
  const [filter, dispatchFilter] = useReducer(filterReducer, initialFilter);

  const showColorFilter = Boolean(COLOR_OPTION.OPTIONS(filter.family).length);

  const onFilterClick = (type: FilterType) => (value: Payload) => () => {
    dispatchFilter({ type, value });
  };

  const getIsPressed = (type: FilterType) => (value: Payload) => {
    return filter[type] === value;
  };

  return (
    <div flex="~ row wrap lg:col" justify="between">
      {GENERAL_FILTER_OPTIONS.map(({ CATEGORY, LABEL, OPTIONS }) => (
        <FilterItem
          key={CATEGORY}
          category={CATEGORY}
          label={LABEL}
          options={OPTIONS}
          getIsPressed={getIsPressed(CATEGORY)}
          onClick={onFilterClick(CATEGORY)}
        />
      ))}
      {showColorFilter && (
        <FilterItem
          key={COLOR_OPTION.CATEGORY}
          category={COLOR_OPTION.CATEGORY}
          label={COLOR_OPTION.LABEL}
          options={COLOR_OPTION.OPTIONS(filter.family)}
          getIsPressed={getIsPressed(COLOR_OPTION.CATEGORY)}
          onClick={onFilterClick(COLOR_OPTION.CATEGORY)}
        />
      )}
    </div>
  );
}
