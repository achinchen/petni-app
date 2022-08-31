import { useLoaderData } from '@remix-run/react';
import { render, screen } from '@testing-library/react';
import AppearanceInfo from '.';
import { PET } from '~/features/pet/mockData';
import { ADAPT_ME_LABEL, GENDER_LABEL } from './constants';

describe('rendering', () => {
  const { color, gender } = PET;

  beforeEach(() => {
    (useLoaderData as jest.Mock).mockReturnValueOnce({ pet: PET });
    render(<AppearanceInfo />);
  });

  test('render ADAPT_ME_LABEL', () => {
    expect(screen.getByText(ADAPT_ME_LABEL)).toBeDefined();
  });

  test('render gender text', () => {
    expect(screen.getByText(GENDER_LABEL[gender])).toBeDefined();
  });

  test('render color text', () => {
    expect(screen.getByText(color)).toBeDefined();
  });
});
