import { render, screen, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { getPNGFile } from 'spec/utils/getMockFile';
import * as RemixReact from '@remix-run/react';
import { setAdoptionImageUrl } from '~/features/adoption/utils';
import useUploadImage from '.';

type ReturnResult = ReturnType<typeof useUploadImage>;

jest.mock('@remix-run/react', () => {
  const remix = jest.requireActual('@remix-run/react');
  return {
    ...remix,
    useFetcher: jest.fn().mockReturnValue({
      data: { url: 'https://new-image.url' },
      submit: jest.fn(),
      state: 'idle'
    })
  };
});

jest.mock('~/features/adoption/utils', () => ({
  setAdoptionImageUrl: jest.fn((url) => {})
}));

const onFinish = jest.fn();
describe('return value', () => {
  let result: ReturnResult;

  beforeEach(() => {
    const {
      result: { current }
    } = renderHook(() => useUploadImage({ onFinish }));
    result = current;
  });

  test('return isLoading', () => {
    expect(result.isLoading).toBeDefined();
  });

  test('return onUpload', () => {
    expect(result.onUpload).toBeDefined();
  });
});

const TestComponent = () => {
  const { isLoading, onUpload } = useUploadImage({ onFinish });
  return (
    <input
      data-testid="input"
      type="file"
      onChange={onUpload}
      disabled={isLoading}
    />
  );
};

const setupTestAndTriggerUpload = async (uploadWithFile: boolean = true) => {
  render(<TestComponent />);
  await act(() =>
    userEvent.upload(
      screen.getByTestId('input'),
      uploadWithFile ? getPNGFile() : []
    )
  );
};

describe('onUpload', () => {
  const fetcher = RemixReact.useFetcher();

  test('not call fetcher.submit when file.length is falsy', async () => {
    await setupTestAndTriggerUpload(false);
    expect(fetcher.submit).not.toBeCalled();
  });

  test('call fetcher.submit', async () => {
    await setupTestAndTriggerUpload();

    expect(fetcher.submit).toBeCalledWith(
      expect.any(FormData),
      expect.objectContaining({
        method: 'post',
        encType: 'multipart/form-data',
        action: '/api/image/update?index',
        replace: false
      })
    );
  });

  test('update isLoading', async () => {
    fetcher.state = 'submitting';
    await setupTestAndTriggerUpload();

    expect(screen.queryByTestId('input')).toHaveProperty('disabled', true);
  });

  test('trigger setAdoptionImageUrl', async () => {
    await setupTestAndTriggerUpload();
    expect(setAdoptionImageUrl).toBeCalledWith(fetcher.data.url);
  });

  test('trigger onFinish', async () => {
    await setupTestAndTriggerUpload();
    expect(onFinish).toBeCalledWith(fetcher.data.url);
  });
});
