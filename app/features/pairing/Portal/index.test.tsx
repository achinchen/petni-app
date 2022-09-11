import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'spec/mock/components/Layout/Header';
import Portal from '.';
import { STATE, LABEL } from './constants';

const mock = {
  showPanel: false,
  refreshCards: jest.fn(),
  setShowPanel: jest.fn()
};

mock.setShowPanel = jest.fn((show) => (mock.showPanel = show));

jest.mock('~/features/pairing/context', () => {
  return {
    __esModule: true,
    usePairContext: () => ({
      showPanel: mock.showPanel,
      setShowPanel: mock.setShowPanel,
      refreshCards: mock.refreshCards
    })
  };
});

describe('rendering: showPanel is true', () => {
  beforeEach(() => {
    mock.showPanel = true;
    render(<Portal />);
  });

  test('render BACK icon button when showPanel is true', () => {
    expect(screen.getByRole('button', { name: LABEL.BACK })).toBeDefined();
  });

  test('render STATE.FILTER  when showPanel is true', () => {
    expect(screen.getByText(STATE.FILTER)).toBeDefined();
  });

  test('render REFRESH icon button', () => {
    expect(screen.getByRole('button', { name: LABEL.BACK })).toBeDefined();
  });

  test('not render FILTER icon button', () => {
    expect(() => screen.getByRole('button', { name: LABEL.FILTER })).toThrow();
  });
});

describe('rendering: showPanel is false', () => {
  beforeEach(() => {
    mock.showPanel = false;
    render(<Portal />);
  });

  test('render REFRESH icon button when showPanel is false', () => {
    expect(screen.getByRole('button', { name: LABEL.REFRESH })).toBeDefined();
  });

  test('render STATE.PAIRING  when showPanel is false', () => {
    expect(screen.getByText(STATE.PAIRING)).toBeDefined();
  });

  test('render FILTER icon button', () => {
    expect(screen.getByRole('button', { name: LABEL.FILTER })).toBeDefined();
  });

  test('not render BACK icon button', () => {
    expect(() => screen.getByRole('button', { name: LABEL.BACK })).toThrow();
  });
});

describe('interaction', () => {
  test('update showPanel when click FILTER button', async () => {
    mock.showPanel = false;
    render(<Portal />);
    await userEvent.click(screen.getByRole('button', { name: LABEL.FILTER }));
    expect(mock.showPanel).toBe(true);
  });

  test('update showPanel when click BACK button', async () => {
    mock.showPanel = true;
    render(<Portal />);
    await userEvent.click(screen.getByRole('button', { name: LABEL.BACK }));
    expect(mock.showPanel).toBe(false);
  });

  test('trigger refreshCards when click REFRESH button', async () => {
    mock.showPanel = false;
    render(<Portal />);
    await userEvent.click(screen.getByRole('button', { name: LABEL.REFRESH }));
    expect(mock.refreshCards).toBeCalled();
  });
});
