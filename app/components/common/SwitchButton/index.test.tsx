import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SwitchButton from '.';

const mock = {
  onChange: jest.fn(),
  checked: true
};

describe('rendering', () => {
  beforeEach(() => {
    render(<SwitchButton checked={mock.checked} onChange={mock.onChange} />);
  });

  test('render checkbox', () => {
    expect(screen.getByRole('checkbox').getAttribute('aria-checked')).toBe(
      `${mock.checked}`
    );
  });
});

describe('interaction', () => {
  beforeEach(async () => {
    render(<SwitchButton checked={mock.checked} onChange={mock.onChange} />);
    await userEvent.click(screen.getByRole('checkbox'));
  });

  test('trigger onChange', () => {
    expect(mock.onChange).toBeCalled();
  });
});
