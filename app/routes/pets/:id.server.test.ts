import type { MetaFunction } from '@remix-run/node';
import { redirect, json } from '@remix-run/node';
import { authenticator } from 'spec/utils/authenticator';
import getContext from 'spec/utils/getContext';
import { controller } from 'spec/mock/server/adapters/animal/index.controller';
import getMetaBaseByAnimal from '~/utils/seo/getMetaBaseByAnimal';
import { USER } from 'spec/mock/constants/user';
import { ANIMAL_INFO } from 'spec/mock/constants/animal';
import { meta, loader } from './:id';

jest.mock('server/gateways/animal/postgres/index');
jest.mock('server/gateways/animal-follow/postgres/index');
jest.mock('~/utils/seo/getMetaBaseByAnimal');

type MetaFunctionParameters = Parameters<MetaFunction>[0];

beforeEach(() => {
  authenticator.isAuthenticated.mockResolvedValue(USER);
});

describe('meta', () => {
  it('trigger getMetaBaseByAnimal', () => {
    const context = {
      data: { pet: ANIMAL_INFO }
    } as unknown as MetaFunctionParameters;

    meta(context);
    expect(getMetaBaseByAnimal).toBeCalledWith({
      animal: ANIMAL_INFO
    });
  });
});

describe('loader', () => {
  it('redirect when params.id is falsy', async () => {
    const context = getContext({ params: {} });
    await loader(context);
    expect(redirect).toBeCalledWith('/');
  });

  it('trigger controller.getInfo', async () => {
    const id = 1;
    const context = getContext({ params: { id } });
    controller.getInfo.mockResolvedValueOnce([404, undefined]);

    await loader(context);
    expect(controller.getInfo).toBeCalledWith(id, USER.id);
  });

  it('return 404 when animal cannot find', async () => {
    const id = 1;
    const context = getContext({ params: { id } });
    controller.getInfo.mockResolvedValueOnce([404, undefined]);
    await loader(context);
    expect(json).toBeCalledWith(`找不到 No.${id} 的浪浪`, 404);
  });

  it('return data when animal is found', async () => {
    const id = 1;
    const context = getContext({ params: { id } });
    controller.getInfo.mockResolvedValueOnce([200, ANIMAL_INFO]);
    await loader(context);
    expect(json).toBeCalledWith({ pet: ANIMAL_INFO });
  });
});
