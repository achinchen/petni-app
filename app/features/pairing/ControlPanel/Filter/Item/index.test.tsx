import type { Action } from '~/features/pairing/ControlPanel/hooks/useFilterState';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockComponent } from 'spec/utils/getMockComponent';
import FilterItem from '.';
import { initialState } from '~/features/pairing/ControlPanel/context';
import { FAMILY_OPTION } from '~/features/pairing/ControlPanel/constants/filter';

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
  optionButton: 'OptionButton'
};

jest.mock('./OptionButton', () => MockComponent('OptionButton'));

describe('rendering', () => {
  beforeEach(() => {
    render(
      <FilterItem
        category={FAMILY_OPTION.CATEGORY}
        label={FAMILY_OPTION.LABEL}
        options={FAMILY_OPTION.OPTIONS}
      />
    );
  });

  test('render label', () => {
    expect(screen.getByText(FAMILY_OPTION.LABEL)).toBeDefined();
  });

  test('render OptionButton', () => {
    expect(screen.getAllByTestId(testId.optionButton)).toHaveLength(
      FAMILY_OPTION.OPTIONS.length
    );
  });
});

describe('interaction', () => {
  const { CATEGORY: category, LABEL: label, OPTIONS: options } = FAMILY_OPTION;
  const targetIndex = 0;
  const targetOptionValue = options[targetIndex].VALUE;
  beforeEach(async () => {
    render(<FilterItem category={category} label={label} options={options} />);
    await userEvent.click(
      screen.getAllByTestId(testId.optionButton)[targetIndex]
    );
  });

  test('trigger dispatchFilter', () => {
    expect(mock.dispatchFilter).toBeCalledWith({
      type: category,
      value: targetOptionValue
    });
  });

  test('update value', () => {
    expect(mock.filter[category]).toBe(targetOptionValue);
  });
});
