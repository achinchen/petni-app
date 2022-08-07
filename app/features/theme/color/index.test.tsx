import { screen, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeColor } from '.';
import { FAMILY_LABEL } from './constants';

describe('rendering', () => {
  beforeEach(() => {
    render(
      <Router>
        <ThemeColor />
      </Router>
    );
  });

  test('renders switch button', () => {
    Object.values(FAMILY_LABEL).forEach((familyLabel) => {
      expect(screen.getByRole('button', { name: familyLabel })).toBeDefined();
    });
  });

  test('renders search link', () => {
    expect(screen.getByRole('link', { name: /搜尋/ })).toHaveProperty(
      'href',
      expect.stringContaining('http://localhost/?search')
    );
  });

  test('renders control buttons', () => {
    expect(screen.getAllByRole('button', { name: /go/i })).toHaveLength(2);
  });
});
