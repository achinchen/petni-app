import type { MetaFunction } from '@remix-run/node';
import { meta, loader } from './:id';
import getContext from 'spec/utils/getContext';
import getAnimalById from '~/models/Animal/getAnimalById/index.server';
import { redirect, json } from '@remix-run/node';
import getMetaBaseByAnimal from '~/utils/seo/getMetaBaseByAnimal';
import { PET } from 'spec/mock/constants/pet';
import { USER } from 'spec/mock/constants/user';

type MetaFunctionParameters = Parameters<MetaFunction>[0];

jest.mock('~/models/animal/getAnimalById/index.server');
jest.mock('~/utils/seo/getMetaBaseByAnimal');

jest.mock('~/services/auth/index.server', () => {
  const { USER } = jest.requireActual('spec/mock//constants/user');
  return {
    __esModule: true,
    authenticator: {
      isAuthenticated: jest.fn().mockResolvedValue(USER)
    }
  };
});

describe('meta', () => {
  it('trigger getMetaBaseByAnimal', () => {
    const context = {
      data: { pet: PET }
    } as unknown as MetaFunctionParameters;

    meta(context);
    expect(getMetaBaseByAnimal).toBeCalledWith({
      animal: PET
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
    expect(getAnimalById).toBeCalledWith(id, USER.id);
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
