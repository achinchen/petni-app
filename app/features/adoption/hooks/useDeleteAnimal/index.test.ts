import { renderHook } from '@testing-library/react-hooks';
import * as RemixReact from '@remix-run/react';
import useDeleteAnimal from '.';

type ReturnResult = ReturnType<typeof useDeleteAnimal>;

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

describe('return value', () => {
  let result: ReturnResult;

  beforeEach(() => {
    const {
      result: { current }
    } = renderHook(() => useDeleteAnimal());
    result = current;
  });

  test('return onDelete', () => {
    expect(result.onDelete).toBeDefined();
  });
});

describe('onDelete', () => {
  const fetcher = RemixReact.useFetcher();
  const id = 1;

  beforeEach(() => {
    fetcher.state = 'idle';
  });

  test('not call fetcher.submit when loading', () => {
    fetcher.state = 'loading';
    const {
      result: {
        current: { onDelete }
      }
    } = renderHook(useDeleteAnimal);
    onDelete(id);
    expect(fetcher.submit).not.toBeCalled();
  });

  test('call fetcher.submit', async () => {
    const {
      result: {
        current: { onDelete }
      }
    } = renderHook(useDeleteAnimal);
    onDelete(id);
    expect(fetcher.submit).toBeCalledWith(
      expect.any(FormData),
      expect.objectContaining({
        method: 'delete',
        action: '/adoption?index',
        replace: false
      })
    );
  });
});
