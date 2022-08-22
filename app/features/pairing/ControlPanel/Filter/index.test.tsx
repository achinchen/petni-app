import type { Action } from '~/features/pairing/ControlPanel/hooks/useFilterState';
import { render, screen } from '@testing-library/react';
import { MockComponent } from 'spec/utils/getMockComponent';
import FilterPanel from '.';
import { initialState } from '~/features/pairing/ControlPanel/context';
import {
  FAMILY_OPTION,
  GENERAL_FILTER_OPTIONS,
  COLOR_OPTION,
  DEFAULT_OPTION
} from '~/features/pairing/ControlPanel/constants/filter';

const mock = {
  filter: initialState.filter,
  dispatchFilter: jest.fn()
};

mock.dispatchFilter = jest.fn(({ type, value }: Action) => {
  mock.filter = {
    ...mock.filter,
    [type]: value
  };
});

jest.mock('~/features/pairing/ControlPanel/context', () => {
  const { initialState } = jest.requireActual(
    '~/features/pairing/ControlPanel/context'
  );

  return {
    __esModule: true,
    initialState,
    useControlContext: () => ({
      filter: mock.filter,
      dispatchFilter: mock.dispatchFilter
    })
  };
});

const testId = {
  filterItem: 'FilterItem'
};

jest.mock('~/features/pairing/ControlPanel/Filter/Item', () =>
  MockComponent('FilterItem')
);

describe('rendering', () => {
  GENERAL_FILTER_OPTIONS.forEach(({ LABEL, CATEGORY }, index) => {
    test(`render ${CATEGORY} FilterItem`, () => {
      render(<FilterPanel />);
      expect(
        screen.getAllByTestId(testId.filterItem)[index].getAttribute('label')
      ).toBe(LABEL);
    });
  });

  test(`not render color FilterItem`, () => {
    render(<FilterPanel />);
    const labels = screen
      .getAllByTestId(testId.filterItem)
      .map((dom) => dom.getAttribute('label'));
    expect(labels).not.toContain(COLOR_OPTION.LABEL);
  });

  test(`render color FilterItem when family is selected`, () => {
    mock.dispatchFilter({
      type: 'family',
      value: FAMILY_OPTION.OPTIONS[0].VALUE
    });
    render(<FilterPanel />);
    const labels = screen
      .getAllByTestId(testId.filterItem)
      .map((dom) => dom.getAttribute('label'));
    expect(labels).toContain(COLOR_OPTION.LABEL);
  });
});

describe('interaction', () => {
  test('trigger resetColor when update family', async () => {
    const { rerender } = render(<FilterPanel />);

    mock.dispatchFilter({
      type: FAMILY_OPTION.CATEGORY,
      value: FAMILY_OPTION.OPTIONS[1].VALUE
    });

    rerender(<FilterPanel />);

    expect(mock.dispatchFilter).toBeCalledWith({
      type: COLOR_OPTION.CATEGORY,
      value: DEFAULT_OPTION.VALUE
    });
  });
});
