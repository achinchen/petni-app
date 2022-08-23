import { act, renderHook } from '@testing-library/react-hooks';
import useFavorite from '.';
import * as RemixReact from '@remix-run/react';
import * as utils from './utils';
import { PET } from '~/features/pet/mockData';

type ReturnResult = ReturnType<typeof useFavorite>;

jest.mock('@remix-run/react', () => {
  const remix = jest.requireActual('@remix-run/react');
  const { PET } = jest.requireActual('~/features/pet/mockData');
  return {
    ...remix,
    useFetcher: jest
      .fn()
      .mockReturnValue({ data: PET, submit: jest.fn(), state: 'idle' })
  };
});

describe('return value', () => {
  let result: ReturnResult;

  beforeEach(() => {
    const {
      result: { current }
    } = renderHook(() => useFavorite());
    result = current;
  });

  test('return ids', () => {
    expect(result.ids).toBeDefined();
  });

  test('return onAdd', () => {
    expect(result.onAdd).toBeDefined();
  });

  test('return onDelete', () => {
    expect(result.onDelete).toBeDefined();
  });
});

describe('reload by data and refresh', () => {
  beforeEach(() => {
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        ...window.location,
        replace: jest.fn()
      },
      writable: true
    });
  });

  test('reload when refresh and data is truthy', () => {
    renderHook(() => useFavorite({ refresh: true }));
    expect(window.location.replace).toBeCalled();
  });

  test('not reload when refresh is falsy', () => {
    renderHook(() => useFavorite({ refresh: false }));
    expect(window.location.replace).not.toBeCalled();
  });
});

describe('init for favoriteIds', () => {
  const {
    result: {
      current: { ids }
    }
  } = renderHook(() => useFavorite());

  test('not update ids when favoriteIds is falsy', () => {
    jest.spyOn(utils, 'getFavoriteIdsPreference').mockReturnValue([]);
    const {
      result: {
        current: { ids: currentIds }
      }
    } = renderHook(() => useFavorite());

    expect(currentIds).toEqual(ids);
  });

  test('update when favoriteIds is truthy', () => {
    const id = '123';
    jest.spyOn(utils, 'getFavoriteIdsPreference').mockReturnValue([id]);
    const {
      result: {
        current: { ids: currentIds }
      }
    } = renderHook(() => useFavorite());

    expect(currentIds).toContain(id);
  });
});

describe('onAdd', () => {
  let ids: ReturnResult['ids'];
  const testId = 4293838;
  const fetcher = RemixReact.useFetcher();
  beforeEach(async () => {
    jest.spyOn(utils, 'setFavoriteIdsPreference');
    const {
      result: { current }
    } = renderHook(() => useFavorite());

    ids = current.ids;
    await act(() => current.onAdd(testId));
  });

  test('call setFavoriteIdsPreference', () => {
    expect(utils.setFavoriteIdsPreference).toBeCalledWith(ids);
  });

  test('call fetcher.submit', () => {
    expect(fetcher.submit).toBeCalledWith(
      expect.any(FormData),
      expect.objectContaining({
        method: 'patch',
        action: '/api/follow?index',
        replace: false
      })
    );
  });
});

describe('onDelete', () => {
  let ids: ReturnResult['ids'];
  const testId = PET.id;
  beforeEach(() => {
    jest.spyOn(utils, 'setFavoriteIdsPreference');
    const {
      result: { current }
    } = renderHook(() => useFavorite());

    ids = current.ids;
    act(() => current.onDelete(testId));
  });

  test('call setFavoriteIdsPreference', () => {
    expect(utils.setFavoriteIdsPreference).toBeCalledWith(ids);
  });
});
