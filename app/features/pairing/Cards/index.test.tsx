import { render, screen } from '@testing-library/react';
import { MockComponent } from 'spec/utils/getMockComponent';
import Cards from '.';

const testId = {
  pairingCard: 'PairingCard',
  recommendCards: 'RecommendCards'
};

jest.mock('./PairingCard', () => MockComponent('PairingCard'));
jest.mock('./RecommendCards', () => MockComponent('RecommendCards'));

describe('rendering', () => {
  beforeEach(() => {
    render(<Cards />);
  });

  test('render PairingCard', () => {
    expect(screen.getByTestId(testId.pairingCard)).toBeDefined();
  });

  test('render RecommendCards', () => {
    expect(screen.getByTestId(testId.recommendCards)).toBeDefined();
  });
});
