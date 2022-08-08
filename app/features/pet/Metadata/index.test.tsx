import * as Remix from '@remix-run/react';
import { render, screen } from '@testing-library/react';
import Metadata from '.';
import { PET } from '~/features/pet/mockData';
import { formatDate } from '~/utils';

describe('rendering', () => {
  beforeEach(() => {
    jest.spyOn(Remix, 'useLoaderData').mockReturnValueOnce({ pet: PET });
    render(<Metadata />);
  });

  test('render code', () => {
    expect(screen.getByText(`${PET.code}`)).toBeDefined();
  });

  test('render follows', () => {
    expect(screen.getByText(`${PET.follows}`)).toBeDefined();
  });

  test('render openAt', () => {
    expect(screen.getByText(formatDate(`${PET.openAt}`))).toBeDefined();
  });
});
