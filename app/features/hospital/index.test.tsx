import { render, screen } from '@testing-library/react';
import setup from 'spec/utils/IntersectionObserver';
import Hospital from '.';
import { HOSPITALS } from './constants';

const cities = Object.values(HOSPITALS);

setup();

describe('rendering', () => {
  beforeEach(() => {
    render(<Hospital />);
  });

  test('renders expected cities', () => {
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(
      cities.length
    );
  });
});
