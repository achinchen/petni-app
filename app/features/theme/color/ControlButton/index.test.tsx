import ControlButton from '.';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Context from '~/features/theme/color/context';
import { INFORMATION } from '~/features/theme/color/constants';
import { Family } from '~/constants';

let mockObject = { currentIndex: 0 };
const lastIndex = Context.initialState.familyInformation.length - 1;
const setIndex = jest.fn((cb) => {
  mockObject.currentIndex = cb(mockObject.currentIndex);
});

jest.spyOn(Context, 'useThemeColorContext').mockImplementation(() => {
  return {
    ...Context.initialState,
    currentIndex: mockObject.currentIndex,
    setIndex
  };
});

describe('next button', () => {
  beforeEach(() => {
    mockObject.currentIndex = 0;
    render(<ControlButton isNext />);
  });

  test('called setIndex', async () => {
    await act(() => userEvent.click(screen.getByRole('button')));

    expect(setIndex).toBeCalled();
  });

  test('update currentIndex', async () => {
    await act(() => userEvent.click(screen.getByRole('button')));

    expect(mockObject.currentIndex).toBe(1);
  });

  test('set currentIndex as 0 when currentIndex is last one', async () => {
    mockObject.currentIndex = lastIndex;
    await act(() => userEvent.click(screen.getByRole('button')));

    expect(mockObject.currentIndex).toBe(0);
  });
});

describe('previous button', () => {
  beforeEach(() => {
    mockObject.currentIndex = lastIndex;
    render(<ControlButton isNext={false} />);
  });

  test('called setIndex', async () => {
    await act(() => userEvent.click(screen.getByRole('button')));

    expect(setIndex).toBeCalled();
  });

  test('update currentIndex', async () => {
    await act(() => userEvent.click(screen.getByRole('button')));

    expect(mockObject.currentIndex).toBe(lastIndex - 1);
  });

  test('set currentIndex as lastIndex when currentIndex is first one', async () => {
    mockObject.currentIndex = 0;
    await act(() => userEvent.click(screen.getByRole('button')));

    expect(mockObject.currentIndex).toBe(lastIndex);
  });
});
