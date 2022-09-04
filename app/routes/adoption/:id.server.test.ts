import type { MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import getJsonFormData from 'spec/utils/getJsonFormData';
import getContext from 'spec/utils/getContext';
import { authenticator } from '~/services/auth/index.server';
import getMetaBaseByAnimal from '~/utils/seo/getMetaBaseByAnimal';
import updateAnimalById from '~/models/animal/updateAnimalById/index.server';
import getAnimalById from '~/models/animal/getAnimalById/index.server';
import { action, loader, meta } from './:id';
import { ANIMAL } from 'spec/__mock__/constants/animal';
import { User } from 'spec/__mock__/constants/user';

type MetaFunctionParameters = Parameters<MetaFunction>[0];

const mock = {
  id: ANIMAL.id
};

jest.mock('~/models/animal/updateAnimalById/index.server');
jest.mock('~/models/animal/getAnimalById/index.server');
jest.mock('~/utils/seo/getMetaBaseByAnimal');

jest.mock('~/services/auth/index.server', () => ({
  __esModule: true,
  authenticator: {
    isAuthenticated: jest.fn().mockResolvedValue(null)
  }
}));

describe('meta', () => {
  it('trigger getMetaBaseByAnimal', () => {
    const context = {
      data: { animal: ANIMAL }
    } as unknown as MetaFunctionParameters;
    meta(context);

    expect(getMetaBaseByAnimal).toBeCalledWith({
      animal: ANIMAL,
      prefix: { title: '編輯 ' }
    });
  });
});

describe('action', () => {
  let context = getContext({
    request: { formData: jest.fn() }
  });

  it('return 400 when request.formData is falsy', async () => {
    context.request.formData = jest.fn().mockResolvedValueOnce(null);
    await action(context);
    expect(json).toBeCalledWith({}, 400);
  });

  it('return 401 when user is not isAuthenticated', async () => {
    context.request.formData = jest
      .fn()
      .mockResolvedValueOnce(getJsonFormData(1));
    await action(context);
    expect(json).toBeCalledWith({}, 401);
  });

  it('return 404 when id is falsy', async () => {
    context.request.formData = jest
      .fn()
      .mockResolvedValueOnce(getJsonFormData(null));
    authenticator.isAuthenticated = jest.fn().mockResolvedValueOnce(User);
    await action(context);
    expect(json).toBeCalledWith({}, 404);
  });

  it('trigger updateAnimalById', async () => {
    context.request.formData = jest
      .fn()
      .mockResolvedValueOnce(getJsonFormData(mock.id));
    authenticator.isAuthenticated = jest.fn().mockResolvedValueOnce(User);
    await action(context);
    expect(updateAnimalById).toBeCalledWith(mock.id, User);
  });

  it('return 500 when update animal is failed', async () => {
    context.request.formData = jest
      .fn()
      .mockResolvedValueOnce(getJsonFormData(mock.id));
    authenticator.isAuthenticated = jest.fn().mockResolvedValueOnce(User);
    (updateAnimalById as jest.Mock).mockResolvedValueOnce(null);
    await action(context);
    expect(json).toBeCalledWith({}, 500);
  });

  it('return animal when update animal is succeeded', async () => {
    context.request.formData = jest
      .fn()
      .mockResolvedValueOnce(getJsonFormData(mock.id));
    authenticator.isAuthenticated = jest.fn().mockResolvedValueOnce(User);
    (updateAnimalById as jest.Mock).mockResolvedValueOnce(null);
    await action(context);
    expect(json).toBeCalledWith({}, 500);
  });
});

describe('loader', () => {
  let context = getContext({
    params: { id: mock.id }
  });

  it('redirect / when user is not login', async () => {
    await loader(context);
    expect(redirect).toBeCalledWith('/');
  });

  it('trigger getAnimalById', async () => {
    authenticator.isAuthenticated = jest.fn().mockResolvedValueOnce(User);
    (getAnimalById as jest.Mock).mockResolvedValueOnce(ANIMAL);
    await loader(context);
    expect(getAnimalById).toBeCalledWith(context.params.id);
  });

  it('throw Response when animal is not founded', async () => {
    authenticator.isAuthenticated = jest.fn().mockResolvedValueOnce(User);
    let result;
    try {
      await loader(context);
    } catch (response) {
      result = response;
    }

    expect(result).toEqual(
      new Response(`找不到 No.${context.params.id} 的浪浪`, {
        status: 404
      })
    );
  });

  it('return animal when animal is founded', async () => {
    authenticator.isAuthenticated = jest.fn().mockResolvedValueOnce(User);
    (getAnimalById as jest.Mock).mockResolvedValueOnce(ANIMAL);
    await loader(context);
    expect(json).toBeCalledWith({ animal: ANIMAL });
  });
});