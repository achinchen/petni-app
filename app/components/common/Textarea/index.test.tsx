import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Textarea from '../Textarea';

const mock = {
  onValueChange: jest.fn()
};

describe('rendering', () => {
  beforeEach(() => {
    render(<Textarea />);
  });

  test('render textarea', () => {
    expect(screen.getByRole('textbox')).toBeDefined();
  });
});

describe('interaction', () => {
  const inputValue = 'test';

  beforeEach(async () => {
    render(<Textarea onValueChange={mock.onValueChange} />);
    await userEvent.type(screen.getByRole('textbox'), inputValue);
  });

  test('trigger onValueChange when typing', () => {
    expect(mock.onValueChange).toBeCalledWith(inputValue);
  });
});
