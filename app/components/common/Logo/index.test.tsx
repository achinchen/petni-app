import { render, screen } from '@testing-library/react';
import Logo from '.';
import { SOURCE, APP_NAME } from './constants';

describe('rendering', () => {
  test('render vertical logo', () => {
    render(<Logo type="vertical" />);
    expect(screen.getByAltText(new RegExp(APP_NAME))).toHaveProperty(
      'src',
      expect.stringContaining(SOURCE.vertical)
    );
  });

  test('render horizontal logo', () => {
    render(<Logo type="horizontal" />);
    expect(screen.getByAltText(new RegExp(APP_NAME))).toHaveProperty(
      'src',
      expect.stringContaining(SOURCE.horizontal)
    );
  });
});
