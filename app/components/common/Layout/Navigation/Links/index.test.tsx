import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { MockComponent } from 'spec/utils/getMockComponent';
import { ACTIONS } from './constants';
import Links from '.';

const testId = {
  icon: 'Icon',
  label: 'Label'
};

jest.mock('~/components/common/Icon', () => MockComponent('Icon'));
jest.mock('./Label', () => MockComponent('Label'));

describe('rendering', () => {
  test('render Icon', () => {
    render(
      <Router>
        <Links />
      </Router>
    );
    expect(screen.getAllByTestId(testId.icon)).toHaveLength(ACTIONS.length);
  });

  test('not render Label', () => {
    render(
      <Router>
        <Links />
      </Router>
    );
    expect(() => screen.getAllByTestId(testId.label)).toThrow();
  });

  test('render Label when pass withLabel', () => {
    render(
      <Router>
        <Links withLabel />
      </Router>
    );
    expect(screen.getAllByTestId(testId.label)).toBeDefined();
  });
});
