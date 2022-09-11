import type { Parameters as UseSwipeParameters } from './hooks/useSwipe';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import FrontCard from '.';
import { ANIMAL } from 'spec/mock/constants/animal';
import { getLabelById } from '~/features/pairing/Cards/PairingCard/utils';
import { IMAGE_MISSING } from '~/constants/pet';
import { ANIMATION, FAMILY_SOUND, LABEL as A11Y_LABEL } from './constants';

const mock = {
  favoriteIds: new Set(),
  onAdd: jest.fn(),
  onPlay: jest.fn(),
  onClose: () => {},
  onFavorite: () => {},
  onNext: jest.fn()
};

jest.mock('~/hooks/useFavorite', () => ({
  __esModule: true,
  default: () => ({ onAdd: mock.onAdd })
}));

jest.mock('~/hooks/useSound', () => ({
  __esModule: true,
  default: () => ({ onPlay: mock.onPlay })
}));

jest.mock('./hooks/useSwipe', () => ({
  __esModule: true,
  default: ({ onSwipeLeft, onSwipeRight }: UseSwipeParameters) => {
    mock.onClose = jest.fn(onSwipeLeft);
    mock.onFavorite = jest.fn(onSwipeRight);
  }
}));

describe('rendering: with image', () => {
  beforeEach(() => {
    render(
      <Router>
        <FrontCard onNext={mock.onNext} currentCard={ANIMAL} />
      </Router>
    );
  });

  test('render /pets/:id link', () => {
    expect(screen.getByRole('link')).toHaveProperty(
      'href',
      expect.stringContaining(`/pets/${ANIMAL.id}`)
    );
  });

  test('render id', () => {
    expect(screen.getByText(ANIMAL.id)).toBeDefined();
  });

  test('render location', () => {
    expect(screen.getByText(ANIMAL.location)).toBeDefined();
  });

  test('render favorite button', () => {
    expect(
      screen.getByRole('button', { name: A11Y_LABEL.FAVORITE })
    ).toBeDefined();
  });

  test('render gender icon', () => {
    expect(screen.getByRole('img', { name: A11Y_LABEL.GENDER })).toBeDefined();
  });

  test('render info link', () => {
    expect(screen.getByRole('link', { name: A11Y_LABEL.INFO })).toBeDefined();
  });

  test('render close button', () => {
    expect(screen.getByRole('button', { name: A11Y_LABEL.SKIP })).toBeDefined();
  });

  test('not render IMAGE_MISSING', () => {
    expect(() => screen.getByText(IMAGE_MISSING)).toThrow();
  });

  test('not render PLACEHOLDER_IMG', () => {
    expect(() => screen.getByRole('img', { name: IMAGE_MISSING })).toThrow();
  });
});

describe('rendering: without image', () => {
  beforeEach(() => {
    render(
      <Router>
        <FrontCard
          onNext={mock.onNext}
          currentCard={{ ...ANIMAL, imageUrl: '' }}
        />
      </Router>
    );
  });

  test('render IMAGE_MISSING', () => {
    expect(screen.getByText(IMAGE_MISSING)).toBeDefined();
  });

  test('render PLACEHOLDER_IMG', () => {
    expect(screen.getByRole('img', { name: IMAGE_MISSING })).toBeDefined();
  });
});

const LABEL = getLabelById(ANIMAL.id);
describe('interaction: onClose', () => {
  beforeEach(async () => {
    render(
      <Router>
        <FrontCard onNext={mock.onNext} currentCard={ANIMAL} />
      </Router>
    );
    await userEvent.click(
      screen.getByRole('button', { name: A11Y_LABEL.SKIP })
    );
  });

  test('use close animation', () => {
    expect(screen.getByLabelText(LABEL).getAttribute('animate')).toEqual(
      expect.stringMatching(ANIMATION.CLOSE)
    );
  });

  test('clear animate after animation finished', () => {
    fireEvent.animationEnd(screen.getByLabelText(LABEL));

    expect(screen.getByLabelText(LABEL).getAttribute('animate')).not.toEqual(
      expect.stringMatching(ANIMATION.CLOSE)
    );
  });

  test('trigger onNext after animation finished', () => {
    fireEvent.animationEnd(screen.getByLabelText(LABEL));

    expect(mock.onNext).toBeCalled();
  });
});

describe('interaction: onFavorite', () => {
  beforeEach(async () => {
    render(
      <Router>
        <FrontCard onNext={mock.onNext} currentCard={ANIMAL} />
      </Router>
    );
    await userEvent.click(
      screen.getByRole('button', { name: A11Y_LABEL.FAVORITE })
    );
  });

  test('trigger onAdd', () => {
    expect(mock.onAdd).toBeCalledWith(ANIMAL.id);
  });

  test('trigger onPlay', () => {
    expect(mock.onPlay).toBeCalledWith(FAMILY_SOUND[ANIMAL.family]);
  });

  test('use favorite animation', () => {
    expect(screen.getByLabelText(LABEL).getAttribute('animate')).toEqual(
      expect.stringMatching(ANIMATION.FAVORITE)
    );
  });

  test('clear animate after animation finished', () => {
    fireEvent.animationEnd(screen.getByLabelText(LABEL));

    expect(screen.getByLabelText(LABEL).getAttribute('animate')).not.toEqual(
      expect.stringMatching(ANIMATION.FAVORITE)
    );
  });

  test('trigger onNext after animation finished', () => {
    fireEvent.animationEnd(screen.getByLabelText(LABEL));

    expect(mock.onNext).toBeCalled();
  });
});
