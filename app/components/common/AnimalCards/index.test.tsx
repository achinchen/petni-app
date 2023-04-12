import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import type { Props } from '.';
import AnimalCards from '.';
import { ANIMALS } from 'spec/mock/constants/animals';
import { CANCEL, CONFIRM } from '~/components/common/DeletePanel/constants';

let onDelete = jest.fn();

const renderComponent = ({
  children
}: { children?: Props['children'] } = {}) => {
  render(
    <Router>
      <AnimalCards animals={ANIMALS} onDelete={onDelete}>
        {children}
      </AnimalCards>
    </Router>
  );
};

describe('rendering', () => {
  const CHILDREN_TEXT = 'children';
  beforeEach(() => {
    renderComponent({ children: <div>{CHILDREN_TEXT}</div> });
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
      name: /的照片/
    });

    ANIMALS.forEach(({ imageUrl }, index) => {
      expect(images[index]).toHaveProperty('src', imageUrl);
    });
  });

  test('render button', () => {
    expect(screen.getAllByRole('button')).toHaveLength(ANIMALS.length);
  });

  test('render heading', () => {
    ANIMALS.forEach(({ id }) => {
      expect(
        screen.getByRole('heading', { level: 2, name: new RegExp(`${id}`) })
      ).toBeDefined();
    });
  });

  test('render dialog', () => {
    expect(screen.queryByRole('dialog')).toBeDefined();
  });

  test('render children', () => {
    expect(screen.getByText(CHILDREN_TEXT)).toBeDefined();
  });
});

describe('delete', () => {
  const ANIMAL = ANIMALS[0];
  beforeEach(async () => {
    renderComponent();
    await act(() => userEvent.click(screen.getAllByRole('button')[0]));
  });

  test('open delete panel when click delete button', async () => {
    expect(screen.getByRole('dialog')).toHaveProperty('open', true);
  });

  test('close delete panel when click panel cancel button', async () => {
    await act(() =>
      userEvent.click(screen.getByRole('button', { name: CANCEL }))
    );
    expect(() => screen.getByRole('dialog')).toThrow();
  });

  test('trigger onDelete when click panel confirm button', async () => {
    await act(() =>
      userEvent.click(screen.getByRole('button', { name: CONFIRM }))
    );
    expect(onDelete).toBeCalledWith(ANIMAL.id);
  });

  test('close delete panel after trigger onDelete', async () => {
    await act(() =>
      userEvent.click(screen.getByRole('button', { name: CONFIRM }))
    );
    expect(() => screen.getByRole('dialog')).toThrow();
  });
});
