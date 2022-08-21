import { render, screen } from '@testing-library/react';
import { MockComponent } from 'spec/utils/getMockComponent';
import FullPageLoading from '.';

const testId = {
  logo: 'Logo'
};

jest.mock('~/components/common/Logo', () => MockComponent('Logo'));

describe('rendering', () => {
  beforeEach(() => {
    render(<FullPageLoading />);
  });

  test('render Logo', () => {
    expect(screen.getByTestId(testId.logo)).toBeDefined();
  });

  test('render heading', () => {
    expect(screen.getByRole('heading', { level: 6 })).toBeDefined();
  });
});
