import { render, screen } from '@testing-library/react';
import { MockComponent } from 'spec/utils/getMockComponent';
import BackCard from '.';

const testId = {
  emptyCard: 'EmptyCard',
  nonEmptyCard: 'NonEmptyCard'
};

jest.mock('./EmptyCard', () => MockComponent('EmptyCard'));
jest.mock('./NonEmptyCard', () => MockComponent('NonEmptyCard'));

describe('rendering: empty', () => {
  beforeEach(() => {
    render(<BackCard isEmpty />);
  });

  test('render EmptyCard when empty', () => {
    expect(screen.getByTestId(testId.emptyCard)).toBeDefined();
  });

  test('not render NonEmptyCard', () => {
    expect(() => screen.getByTestId(testId.nonEmptyCard)).toThrow();
  });
});

describe('rendering: not empty', () => {
  beforeEach(() => {
    render(<BackCard isEmpty={false} />);
  });

  test('not render EmptyCard', () => {
    expect(() => screen.getByTestId(testId.emptyCard)).toThrow();
  });

  test('render NonEmptyCard', () => {
    expect(screen.getByTestId(testId.nonEmptyCard)).toBeDefined();
  });
});
