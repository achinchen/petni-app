import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MockComponent, getProp } from 'spec/utils/getMockComponent';
import { NavigationDesktop, NavigationMobile } from '.';

const testId = {
  logo: 'Logo',
  links: 'Links'
};

jest.mock('./Links', () => MockComponent('Links'));
jest.mock('~/components/common/Logo', () => MockComponent('Logo'));

describe('NavigationDesktop: rendering', () => {
  beforeEach(() => {
    render(
      <Router>
        <NavigationDesktop />
      </Router>
    );
  });

  test('render nav', () => {
    expect(screen.getByRole('navigation')).toBeDefined();
  });

  test('render Logo', () => {
    expect(screen.getByTestId(testId.logo)).toBeDefined();
  });

  test('render link to /', () => {
    expect(screen.getByRole('link')).toHaveProperty(
      'href',
      'http://localhost/'
    );
  });

  test('render Links', () => {
    expect(getProp('withLabel', testId.links)).toBe('true');
  });
});

describe('NavigationMobile: rendering', () => {
  beforeEach(() => {
    render(<NavigationMobile />);
  });

  test('render Links', () => {
    expect(getProp('withLabel', testId.links)).toBe(null);
  });
});
