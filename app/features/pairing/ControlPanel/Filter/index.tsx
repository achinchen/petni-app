import type { Family, Gender, Age, Color } from './type';
import FilterItem from '~/features/pairing/ControlPanel/Filter/Item';
import { useControlContext } from '~/features/pairing/ControlPanel/context';
import {
  GENERAL_FILTER_OPTIONS,
  COLOR_OPTION
} from '~/features/pairing/ControlPanel/constants/filter';

type Filter = {
  family: Family;
  gender: Gender;
  color: Color;
  age: Age;
};

type FilterType = keyof Filter;
type Payload = ValueOf<Filter>;

export default function FilterPanel() {
  const { filter, dispatchFilter } = useControlContext();

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
