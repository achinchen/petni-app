import { render, screen } from '@testing-library/react';
import { act } from '@testing-library/react-hooks';
import { MockComponent } from 'spec/utils/getMockComponent';
import { Pairing } from '.';

const mock = {
  isLoading: false,
  showPanel: false
};

jest.mock('./context', () => {
  return {
    __esModule: true,
    usePairContext: () => ({
      isLoading: mock.isLoading,
      showPanel: mock.showPanel
    })
  };
});

const testId = {
  cards: 'Cards',
  loading: 'Loading'
};

jest.mock('./Cards', () => MockComponent('Cards'));

jest.mock('~/components/common/LoadingAnimation', () =>
  MockComponent('Loading')
);

describe('rendering: loading', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    render(<Pairing />);
  });

  test('render Loading', () => {
    expect(screen.getByTestId(testId.loading).getAttribute('visible')).toBe(
      'true'
    );
  });

  test('not render Cards', () => {
    render(<Pairing />);
    expect(() => screen.getByTestId(testId.cards)).toThrow();
  });
});

describe('rendering: initialized', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mock.isLoading = false;
    render(<Pairing />);
    act(() => {
      jest.runAllTimers();
    });
  });

  test('not render Loading', () => {
    expect(screen.getByTestId(testId.loading).getAttribute('visible')).toBe(
      'false'
    );
  });

  test('render Cards', () => {
    expect(screen.getByTestId(testId.cards)).toBeDefined();
  });
});
