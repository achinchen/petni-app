import * as Remix from '@remix-run/react';
import { render, screen } from '@testing-library/react';
import ContactNote from '.';
import { PET } from '~/features/pet/mockData';
import { getAddressLink, getTelephoneLink } from '~/utils';

describe('rendering', () => {
  beforeEach(() => {
    jest.spyOn(Remix, 'useLoaderData').mockReturnValueOnce({ pet: PET });
    render(<ContactNote />);
  });

  const { tel, address } = PET;

  test('render telephone link', () => {
    expect(screen.getByRole('link', { name: tel })).toHaveProperty(
      'href',
      getTelephoneLink(tel)
    );
  });

  test('render address link', () => {
    expect(screen.getByRole('link', { name: address })).toHaveProperty(
      'href',
      getAddressLink(encodeURIComponent(address))
    );
  });
});
