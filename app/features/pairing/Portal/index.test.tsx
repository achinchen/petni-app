import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'spec/mock/components/Layout/Header';
import Portal from '.';
import { STATE } from './constants';

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

  test('render back icon button when showPanel is true', () => {
    expect(screen.getByRole('button', { name: /previous/ })).toBeDefined();
  });

  test('render STATE.FILTER  when showPanel is true', () => {
    expect(screen.getByText(STATE.FILTER)).toBeDefined();
  });

  test('not render filter icon button', () => {
    expect(() => screen.getByRole('button', { name: /filter/ })).toThrow();
  });
});

describe('rendering: showPanel is false', () => {
  beforeEach(() => {
    mock.showPanel = false;
    render(<Portal />);
  });

  test('render refresh icon button when showPanel is false', () => {
    expect(screen.getByRole('button', { name: /undo/ })).toBeDefined();
  });

  test('render STATE.PAIRING  when showPanel is false', () => {
    expect(screen.getByText(STATE.PAIRING)).toBeDefined();
  });

  test('render filter icon button', () => {
    expect(screen.getByRole('button', { name: /filter/ })).toBeDefined();
  });
});

describe('interaction', () => {
  test('update showPanel when click filter button', async () => {
    mock.showPanel = false;
    render(<Portal />);
    await userEvent.click(screen.getByRole('button', { name: /filter/ }));
    expect(mock.showPanel).toBe(true);
  });

  test('update showPanel when click previous button', async () => {
    mock.showPanel = true;
    render(<Portal />);
    await userEvent.click(screen.getByRole('button', { name: /previous/ }));
    expect(mock.showPanel).toBe(false);
  });

  test('trigger refreshCards when click refresh button', async () => {
    mock.showPanel = false;
    render(<Portal />);
    await userEvent.click(screen.getByRole('button', { name: /undo/ }));
    expect(mock.refreshCards).toBeCalled();
  });
});
