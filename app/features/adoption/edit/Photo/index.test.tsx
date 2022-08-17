import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getPNGFile } from 'spec/utils/getMockFile';
import * as Context from '~/features/adoption/edit/context';
import { getAdoptionImageUrl } from '~/features/adoption/utils';
import { IMAGE_EXTENSION } from '~/features/adoption/constants';
import Photo, { UPDATE_IMAGE } from '.';

let mock = {
  animalInfo: Context.initialState.animalInfo,
  imageUrl: 'https://image-url',
  isLoading: false,
  onUpload: jest.fn()
};

jest.spyOn(Context, 'useEditAdoptionContext').mockImplementation(() => {
  return {
    ...Context.initialState,
    animalInfo: mock.animalInfo,
    imageUrl: mock.imageUrl,
    setImageUrl: (url) => (mock.imageUrl = url)
  };
});

jest.mock('~/features/adoption/hooks/useUploadImage', () => ({
  __esModule: true,
  default: () => ({
    onUpload: mock.onUpload,
    isLoading: mock.isLoading
  })
}));

jest.mock('~/features/adoption/utils', () => ({
  getAdoptionImageUrl: jest.fn(() => mock.imageUrl)
}));

describe('rendering', () => {
  beforeEach(() => {
    render(<Photo />);
  });

  test('render image', () => {
    expect(screen.getByRole('img')).toBeDefined();
  });

  test('render uploader', () => {
    expect(screen.getByLabelText(UPDATE_IMAGE)).toHaveProperty(
      'accept',
      IMAGE_EXTENSION
    );
  });

  test('call getAdoptionImageUrl', () => {
    expect(getAdoptionImageUrl).toBeCalled();
  });
});

describe('interaction: upload', () => {
  const file = getPNGFile();
  beforeEach(async () => {
    render(<Photo />);
    await userEvent.upload(screen.getByLabelText(UPDATE_IMAGE), file);
  });

  test('trigger onUpload', () => {
    expect(mock.onUpload).toBeCalled();
  });
});
