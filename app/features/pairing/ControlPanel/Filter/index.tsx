import type { Family, Gender, Size, Color } from './type';
import FilterItem from '~/features/pairing/ControlPanel/Filter/Item';
import { useControlContext } from '~/features/pairing/ControlPanel/context';
import {
  DEFAULT_OPTION,
  FAMILY_OPTION,
  GENERAL_FILTER_OPTIONS,
  COLOR_OPTION
} from '~/features/pairing/ControlPanel/constants/filter';
import { useEffect } from 'react';

type Filter = {
  family: Family;
  gender: Gender;
  color: Color;
  size: Size;
};

type FilterType = keyof Filter;
type Payload = ValueOf<Filter>;

export default function FilterPanel() {
  const { filter, dispatchFilter } = useControlContext();

  const showColorFilter = Boolean(COLOR_OPTION.OPTIONS(filter.family).length);

  const resetColor = () => {
    dispatchFilter({
      type: COLOR_OPTION.CATEGORY,
      value: DEFAULT_OPTION.VALUE
    });
  };

  const onFilterClick = (type: FilterType) => (value: Payload) => () => {
    dispatchFilter({ type, value });
    if (type === FAMILY_OPTION.CATEGORY) resetColor();
  };

  const getIsPressed = (type: FilterType) => (value: Payload) => {
    return filter[type] === value;
  };

  return (
    <div flex="~ row wrap lg:col" justify="between" transition="0.3s">
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
