import type { MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import getJsonFormData from 'spec/utils/getJsonFormData';
import getContext from 'spec/utils/getContext';
import { authenticator } from 'spec/utils/authenticator';
import getMetaBaseByAnimal from '~/utils/seo/getMetaBaseByAnimal';
import updateAnimalById from '~/models/Animal/updateAnimalById/index.server';
import getAnimalById from '~/models/Animal/getAnimalById/index.server';
import { action, loader, meta } from './:id';
import { ANIMAL } from 'spec/mock/constants/animal';
import { USER } from 'spec/mock/constants/user';

type MetaFunctionParameters = Parameters<MetaFunction>[0];

const mock = {
  id: ANIMAL.id
};

jest.mock('~/models/animal/updateAnimalById/index.server');
jest.mock('~/models/animal/getAnimalById/index.server');
jest.mock('~/utils/seo/getMetaBaseByAnimal');

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

  it('return 401 when user is not authenticated', async () => {
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
    authenticator.isAuthenticated.mockResolvedValueOnce(USER);
    await action(context);
    expect(json).toBeCalledWith({}, 404);
  });

  it('trigger updateAnimalById', async () => {
    context.request.formData = jest
      .fn()
      .mockResolvedValueOnce(getJsonFormData(mock.id));
    authenticator.isAuthenticated.mockResolvedValueOnce(USER);
    await action(context);
    expect(updateAnimalById).toBeCalledWith(mock.id, USER);
  });

  it('return 500 when update animal is failed', async () => {
    context.request.formData = jest
      .fn()
      .mockResolvedValueOnce(getJsonFormData(mock.id));
    authenticator.isAuthenticated.mockResolvedValueOnce(USER);
    (updateAnimalById as jest.Mock).mockResolvedValueOnce(null);
    await action(context);
    expect(json).toBeCalledWith({}, 500);
  });

  it('return animal when update animal is succeeded', async () => {
    context.request.formData = jest
      .fn()
      .mockResolvedValueOnce(getJsonFormData(mock.id));
    authenticator.isAuthenticated.mockResolvedValueOnce(USER);
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
    authenticator.isAuthenticated.mockResolvedValueOnce(USER);
    (getAnimalById as jest.Mock).mockResolvedValueOnce(ANIMAL);
    await loader(context);
    expect(getAnimalById).toBeCalledWith(context.params.id);
  });

  it('throw Response when animal is not founded', async () => {
    authenticator.isAuthenticated.mockResolvedValueOnce(USER);
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
    authenticator.isAuthenticated.mockResolvedValueOnce(USER);
    (getAnimalById as jest.Mock).mockResolvedValueOnce(ANIMAL);
    await loader(context);
    expect(json).toBeCalledWith({ animal: ANIMAL });
  });
});
