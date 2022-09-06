import * as RemixReact from '@remix-run/react';
import MockAnimalCards, {
  TEST_ID as ANIMAL_CARDS_TEST_ID,
  ANIMALS,
  DELETE_ID
} from 'spec/mock/components/AnimalCards';
import { MockComponent } from 'spec/utils/getMockComponent';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import Favorites from '.';
import { FETCHER_IDLE_STATE } from '~/constants/utils';
import { SUBTITLE } from './constants';

const renderComponent = () =>
  render(
    <Router>
      <Favorites />
    </Router>
  );

jest.mock('@remix-run/react', () => {
  const remix = jest.requireActual('@remix-run/react');
  const { FETCHER_IDLE_STATE } = jest.requireActual('~/constants/utils');

  return {
    ...remix,
    useFetcher: jest.fn().mockReturnValue({
      data: null,
      submit: jest.fn(),
      state: FETCHER_IDLE_STATE
    })
  };
});

const testId = {
  loading: 'loading',
  animalCards: ANIMAL_CARDS_TEST_ID
};

const mocked = {
  ids: new Set()
};

const setupMockedIds = () => ANIMALS.forEach(({ id }) => mocked.ids.add(id));

const onDelete = jest.fn((id) => mocked.ids.delete(id));

jest.mock('~/hooks/useFavorite', () => ({
  __esModule: true,
  default: () => ({ ids: mocked.ids, onDelete, onAdd: () => {} })
}));

jest.mock('~/components/common/LoadingAnimation', () =>
  MockComponent('loading')
);

jest.mock('~/components/common/AnimalCards', () => MockAnimalCards);

beforeEach(() => {
  mocked.ids = new Set();
});

describe('rendering', () => {
  beforeEach(() => {
    RemixReact.useFetcher().state = FETCHER_IDLE_STATE;
    RemixReact.useFetcher().data = null;
    renderComponent();
  });

  test('render SUBTITLE', () => {
    expect(screen.getByText(SUBTITLE)).toBeDefined();
  });

  test('not render Loading when fetcher.state is FETCHER_IDLE_STATE', () => {
    expect(screen.queryByTestId(testId.loading)).toBeFalsy();
  });

  test('render Loading when fetcher.state is not FETCHER_IDLE_STATE', () => {
    RemixReact.useFetcher().state = 'loading';
    renderComponent();
    expect(screen.getByTestId(testId.loading)).toBeDefined();
  });

  test('not render AnimalCards when animals is falsy', () => {
    expect(screen.queryByTestId(testId.animalCards)).toBeFalsy();
  });

  test('render AnimalCards when animals is truthy', () => {
    RemixReact.useFetcher().data = { animals: ANIMALS };
    renderComponent();
    expect(screen.getByTestId(testId.animalCards)).toBeDefined();
  });
});

describe('initial data fetching', () => {
  const fetcher = RemixReact.useFetcher();

  test('not fetch when ids.size is 0', () => {
    renderComponent();
    expect(fetcher.submit).not.toBeCalled();
  });

  test('fetch when ids.size is 1+', () => {
    setupMockedIds();
    renderComponent();
    expect(fetcher.submit).toBeCalled();
  });
});

describe('onDelete', () => {
  beforeEach(() => {
    RemixReact.useFetcher().data = { animals: ANIMALS };
    setupMockedIds();
    renderComponent();
  });

  test('update ids', async () => {
    const animalCards = screen.getByTestId(testId.animalCards);
    await act(() => userEvent.click(animalCards));
    expect(mocked.ids).not.toContain(DELETE_ID);
  });

  test('update animals', async () => {
    const animalCards = screen.getByTestId(testId.animalCards);
    await act(() => userEvent.click(animalCards));
    expect(animalCards.getAttribute('animals')?.split(',')).toHaveLength(
      ANIMALS.length - 1
    );
  });
});
