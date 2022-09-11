import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ANIMALS } from 'spec/mock/constants/animal';
import RecommendCards from '.';
import { getLabelById } from '~/features/pairing/Cards/PairingCard/utils';

const mock = {
  recommendCards: ANIMALS
};

jest.mock('~/features/pairing/context', () => {
  return {
    __esModule: true,
    usePairContext: () => ({
      recommendCards: mock.recommendCards
    })
  };
});

describe('rendering', () => {
  beforeEach(() => {
    render(
      <Router>
        <RecommendCards />
      </Router>
    );
  });

  test('render link', () => {
    const links = screen.getAllByRole('link');

    ANIMALS.forEach(({ id }, index) => {
      expect(links[index]).toHaveProperty(
        'href',
        expect.stringContaining(`/pets/${id}`)
      );
    });
  });

  test('render img', () => {
    const images = screen.getAllByRole('img', {
      name: new RegExp(getLabelById(0).slice(-2))
    });

    ANIMALS.forEach(({ imageUrl }, index) => {
      expect(images[index]).toHaveProperty('src', imageUrl);
    });
  });

  test('render id', () => {
    ANIMALS.forEach(({ id }) => {
      expect(screen.getByText(id)).toBeDefined();
    });
  });

  test('render location', () => {
    ANIMALS.forEach(({ location }) => {
      expect(screen.getAllByText(location)).toBeDefined();
    });
  });
});
