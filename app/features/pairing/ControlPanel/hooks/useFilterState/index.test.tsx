import { renderHook } from '@testing-library/react-hooks';
import useFilterState, { initialFilter } from '.';
import {
  FAMILY_OPTION,
  SIZE_OPTION
} from '~/features/pairing/ControlPanel/constants/filter';
import * as utils from '~/features/pairing/ControlPanel/utils';

type ReturnResult = ReturnType<typeof useFilterState>;

jest.spyOn(utils, 'getFilter');

describe('return value', () => {
  let result: ReturnResult;

  beforeEach(() => {
    const {
      result: { current }
    } = renderHook(() => useFilterState());
    result = current;
  });

  test('return filter', () => {
    expect(result.filter).toEqual(initialFilter);
  });

  test('return dispatchFilter', () => {
    expect(result.dispatchFilter).toBeDefined();
  });
});

describe('initialization', () => {
  test('trigger getFilter', () => {
    jest.spyOn(utils, 'getFilter').mockReturnValueOnce('');
    renderHook(() => useFilterState());
    expect(utils.getFilter).toBeCalled();
  });

  test('update filter when getFilter is truthy', () => {
    const filterPreference = {
      ...initialFilter,
      family: FAMILY_OPTION.OPTIONS[0].VALUE,
      size: SIZE_OPTION.OPTIONS[0].VALUE
    };

    jest.spyOn(utils, 'getFilter').mockReturnValueOnce(filterPreference);

    const {
      result: {
        current: { filter }
      }
    } = renderHook(() => useFilterState());

    Object.entries(filterPreference).forEach(([key, value]) => {
      expect(filter[key as keyof ReturnResult['filter']]).toBe(value);
    });
  });
});
