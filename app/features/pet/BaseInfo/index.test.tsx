import { useLoaderData } from '@remix-run/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseInfo from '.';
import { PET } from '~/features/pet/mockData';

const mocked = {
  ids: new Set()
};

const onAdd = jest.fn((id) => mocked.ids.add(id));

jest.mock('~/hooks/useFavorite', () => ({
  __esModule: true,
  default: () => ({ ids: mocked.ids, onAdd })
}));

describe('rendering', () => {
  const { location, id } = PET;
  beforeEach(() => {
    (useLoaderData as jest.Mock).mockReturnValueOnce({ pet: PET });
    render(<BaseInfo />);
  });

  test('render id', () => {
    expect(screen.getByText(id)).toBeDefined();
  });

  test('render location', () => {
    expect(screen.getByText(location)).toBeDefined();
  });

  test('not render link when editable is false', () => {
    expect(screen.queryByRole('link')).toBeFalsy();
  });

  test('render link when editable is true', () => {
    (useLoaderData as jest.Mock).mockReturnValueOnce({
      pet: { ...PET, editable: true }
    });

    render(
      <Router>
        <BaseInfo />
      </Router>
    );

    expect(screen.getByRole('link')).toHaveProperty(
      'href',
      expect.stringContaining(`/adoption/${id}`)
    );
  });
});

describe('interaction', () => {
  const { id } = PET;
  beforeEach(async () => {
    (useLoaderData as jest.Mock).mockReturnValueOnce({ pet: PET });
    render(<BaseInfo />);
    const favoriteButtons = screen.getByRole('button');
    await userEvent.click(favoriteButtons);
  });

  test('call onAdd after clicking button', () => {
    expect(onAdd).toBeCalledWith(id);
  });

  test('update ids after clicking button', () => {
    expect(mocked.ids).toContain(id);
  });
});
