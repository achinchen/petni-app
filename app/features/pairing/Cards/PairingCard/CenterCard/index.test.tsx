import { render, screen } from '@testing-library/react';
import CenterCard from '.';
import { PLACEHOLDER } from './constants';

const placeholder = new RegExp(PLACEHOLDER.match('(w)?.*')![0]);

describe('rendering', () => {
  test('render PLACEHOLDER when empty', () => {
    render(<CenterCard isEmpty />);
    expect(screen.getByText(placeholder)).toBeDefined();
  });

  test('not render PLACEHOLDER when not empty', () => {
    render(<CenterCard isEmpty={false} />);
    expect(() => screen.getByText(placeholder)).toThrow();
  });
});
