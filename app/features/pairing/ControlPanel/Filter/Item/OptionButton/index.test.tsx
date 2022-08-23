import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockComponent, getProp } from 'spec/utils/getMockComponent';
import OptionButton from '.';
import { BUTTON_SIZE } from '~/features/pairing/ControlPanel/Filter/Item/constants';

const testId = {
  button: 'Button'
};

jest.mock('~/components/common/Button', () => MockComponent('Button'));

const mock = {
  onClick: jest.fn(),
  children: 'children',
  isPressed: false,
  size: BUTTON_SIZE.Sm
};

describe('rendering', () => {
  beforeEach(() => {
    render(<OptionButton {...mock} />);
  });
  test('pass isPressed', () => {
    expect(getProp('isPressed')).toBe(`${mock.isPressed}`);
  });

  test('render children', () => {
    expect(screen.getByText(mock.children)).toBeDefined();
  });
});

describe('interaction', () => {
  beforeEach(async () => {
    render(<OptionButton {...mock} />);
    await userEvent.click(screen.getByTestId(testId.button));
  });
  test('trigger onClick', () => {
    expect(mock.onClick).toBeCalled();
  });
});
