import { useCallback, useEffect } from 'react';
import FilterItem from '~/features/pairing/ControlPanel/Filter/Item';
import { useControlContext } from '~/features/pairing/ControlPanel/context';
import { GENERAL_FILTER_OPTIONS } from '~/features/pairing/ControlPanel/constants/filter';
import {
  DEFAULT_OPTION,
  COLOR_OPTION
} from '~/features/pairing/ControlPanel/constants/filter';

export default function FilterPanel() {
  const { filter, dispatchFilter } = useControlContext();

  const showColorFilter = Boolean(COLOR_OPTION.OPTIONS(filter.family).length);

  const resetColor = useCallback(() => {
    dispatchFilter({
      type: COLOR_OPTION.CATEGORY,
      value: DEFAULT_OPTION.VALUE
    });
  }, [dispatchFilter]);

  useEffect(() => {
    resetColor();
  }, [filter.family, resetColor]);

  return (
    <div flex="~ row wrap lg:col" justify="between" transition="0.3s">
      {GENERAL_FILTER_OPTIONS.map(({ CATEGORY, LABEL, OPTIONS }) => (
        <FilterItem
          key={CATEGORY}
          category={CATEGORY}
          label={LABEL}
          options={OPTIONS}
        />
      ))}
      {showColorFilter && (
        <FilterItem
          key={COLOR_OPTION.CATEGORY}
          category={COLOR_OPTION.CATEGORY}
          label={COLOR_OPTION.LABEL}
          options={COLOR_OPTION.OPTIONS(filter.family)}
        />
      )}
    </div>
  );
}
