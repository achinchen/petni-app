import type { InitialState } from '~/features/pairing/context';
import { render, screen } from '@testing-library/react';
import { MockComponent, getProp } from 'spec/utils/getMockComponent';
import { ANIMAL } from 'spec/mock/constants/animal';
import PairingCard from '.';

const testId = {
  backCard: 'BackCard',
  centerCard: 'CenterCard',
  frontCard: 'FrontCard'
};

const mock: Pick<InitialState, 'currentCard'> = {
  currentCard: ANIMAL
};

jest.mock('~/features/pairing/context', () => {
  return {
    __esModule: true,
    usePairContext: () => ({
      currentCard: mock.currentCard,
      onNext: () => {}
    })
  };
});

jest.mock('./BackCard', () => MockComponent('BackCard'));
jest.mock('./CenterCard', () => MockComponent('CenterCard'));
jest.mock('./FrontCard', () => MockComponent('FrontCard'));

describe('rendering: empty', () => {
  beforeEach(() => {
    mock.currentCard = undefined;
    render(<PairingCard />);
  });

  test('render BackCard', () => {
    expect(getProp('isEmpty', testId.backCard)).toBe('true');
  });

  test('render CenterCard', () => {
    expect(getProp('isEmpty', testId.centerCard)).toBe('true');
  });

  test('not render FrontCard', () => {
    expect(() => screen.getByTestId(testId.frontCard)).toThrow();
  });
});

describe('rendering: not empty', () => {
  beforeEach(() => {
    mock.currentCard = ANIMAL;
    render(<PairingCard />);
  });

  test('render BackCard with empty', () => {
    expect(getProp('isEmpty', testId.backCard)).toBe('false');
  });

  test('render CenterCard with empty', () => {
    expect(getProp('isEmpty', testId.centerCard)).toBe('false');
  });

  test('render FrontCard', () => {
    expect(screen.getByTestId(testId.frontCard)).toBeDefined();
  });
});
