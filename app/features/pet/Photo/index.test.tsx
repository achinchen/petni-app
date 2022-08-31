import { useLoaderData } from '@remix-run/react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Photo from '.';
import { PET } from '~/features/pet/mockData';
import { IMAGE_MISSING, PLACEHOLDER_IMG } from '~/constants/pet';
import { getAlt } from './utils';

const label = getAlt(PET.id, PET.family);

describe('rendering', () => {
  test('render image when imageUrl is truthy', () => {
    (useLoaderData as jest.Mock).mockReturnValueOnce({ pet: PET });
    render(<Photo />);

    expect(screen.getByLabelText(label)).toHaveProperty(
      'style',
      expect.objectContaining({
        'background-image': expect.stringContaining(PET.imageUrl)
      })
    );
  });

  test('render placeholder caption when imageUrl is falsy', () => {
    (useLoaderData as jest.Mock).mockReturnValueOnce({
      pet: { ...PET, imageUrl: null }
    });

    render(<Photo />);

    expect(screen.getByText(IMAGE_MISSING)).toBeDefined();
  });

  test('render placeholder image when imageUrl is falsy', () => {
    (useLoaderData as jest.Mock).mockReturnValueOnce({
      pet: { ...PET, imageUrl: null }
    });

    render(<Photo />);

    expect(screen.getByRole('img', { name: IMAGE_MISSING })).toHaveProperty(
      'src',
      expect.stringContaining(PLACEHOLDER_IMG[PET.family])
    );
  });
});

describe('interaction', () => {
  beforeEach(() => {
    window.open = jest.fn();
  });

  test('open image url when click photo with imageUrl', async () => {
    (useLoaderData as jest.Mock).mockReturnValueOnce({
      pet: PET
    });

    render(<Photo />);

    await act(() => userEvent.click(screen.getByRole('presentation')));

    expect(window.open).toBeCalledWith(PET.imageUrl, '_blank');
  });

  test('not open image url when click photo without imageUrl', async () => {
    (useLoaderData as jest.Mock).mockReturnValueOnce({
      pet: { ...PET, imageUrl: null }
    });
    render(<Photo />);

    await act(() => userEvent.click(screen.getByRole('presentation')));

    expect(window.open).not.toBeCalled();
  });
});
