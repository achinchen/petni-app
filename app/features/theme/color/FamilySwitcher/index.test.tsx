import FamilySwitcher from '.';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Context from '~/features/theme/color/context';
import { FAMILY_LABEL } from '~/features/theme/color/constants';

let mockObject = { currentIndex: 0, family: Context.initialState.family };
const lastIndex = Context.initialState.familyInformation.length - 1;
const setFamily = jest.fn((family) => {
  mockObject.family = family;
});
const setIndex = jest.fn((index) => {
  mockObject.currentIndex = index;
});

const anotherButtonLabel = FAMILY_LABEL.Dog;

jest.spyOn(Context, 'useThemeColorContext').mockImplementation(() => {
  return {
    ...Context.initialState,
    currentIndex: mockObject.currentIndex,
    family: mockObject.family,
    setIndex,
    setFamily
  };
});

describe('switching', () => {
  beforeEach(() => {
    mockObject.family = Context.initialState.family;
    render(<FamilySwitcher />);
  });

  test('called setFamily', async () => {
    await act(() =>
      userEvent.click(screen.getByRole('button', { name: anotherButtonLabel }))
    );

    expect(setFamily).toBeCalled();
  });

  test('update family', async () => {
    const previousFamily = mockObject.family;
    await act(() =>
      userEvent.click(screen.getByRole('button', { name: anotherButtonLabel }))
    );

    expect(mockObject.family).not.toBe(previousFamily);
  });

  test('set currentIndex as 0 when update family', async () => {
    mockObject.currentIndex = lastIndex;
    await act(() =>
      userEvent.click(screen.getByRole('button', { name: anotherButtonLabel }))
    );
    expect(mockObject.currentIndex).not.toBe(lastIndex);
  });
});
