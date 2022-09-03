import type { MetaFunction } from '@remix-run/node';
import { meta, loader } from './:id';
import getContext from 'spec/utils/getContext';
import getAnimalById from '~/models/animal/getAnimalById/index.server';
import { redirect, json } from '@remix-run/node';
import { APP_NAME } from '~/constants';
import { DEFAULT_META } from '~/constants/meta';
import { PET } from 'spec/__mock__/constants/pet';
import { User } from 'spec/__mock__/constants/user';

type MetaFunctionParameters = Parameters<MetaFunction>[0];

jest.mock('~/models/animal/getAnimalById/index.server');

jest.mock('~/services/auth/index.server', () => {
  const { User } = jest.requireActual('spec/__mock__/constants/user');
  return {
    __esModule: true,
    authenticator: {
      isAuthenticated: jest.fn().mockResolvedValue(User)
    }
  };
});

describe('meta', () => {
  it('return DEFAULT_META when data is undefined', () => {
    const context = {
      data: undefined
    } as unknown as MetaFunctionParameters;

    expect(meta(context)).toBe(DEFAULT_META);
  });

  it('return expected metadata when data is truthy', () => {
    const context = {
      data: { pet: PET }
    } as unknown as MetaFunctionParameters;
    const { id, location } = PET;

    expect(meta(context)).toEqual({
      title: `No.${id} ｜ ${APP_NAME} - 陪你找家`,
      description: `No.${id} - 正在 ${location} 等家`
    });
  });
});

describe('loader', () => {
  it('redirect when params.id is falsy', async () => {
    const context = getContext({ params: {} });
    await loader(context);
    expect(redirect).toBeCalledWith('/');
  });

  it('trigger getAnimalById', async () => {
    const id = 1;
    const context = getContext({ params: { id } });
    await loader(context);
    expect(getAnimalById).toBeCalledWith(id, User.id);
  });

  it('return 404 when animal cannot find', async () => {
    const id = 1;
    const context = getContext({ params: { id } });
    await loader(context);
    expect(json).toBeCalledWith(`找不到 No.${id} 的浪浪`, 404);
  });

  it('return data when animal is found', async () => {
    (getAnimalById as jest.Mock).mockResolvedValueOnce(PET);
    const id = 1;
    const context = getContext({ params: { id } });
    await loader(context);
    expect(json).toBeCalledWith({ pet: PET });
  });
});
