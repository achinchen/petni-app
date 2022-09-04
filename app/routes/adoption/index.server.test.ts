import { json, Response } from '@remix-run/node';
import { action, loader } from './index';
import getContext from 'spec/utils/getContext';
import { ANIMAL, ANIMALS } from 'spec/__mock__/constants/animal';
import { User } from 'spec/__mock__/constants/user';
import { authenticator } from '~/services/auth/index.server';
import getAnimalsByUserId from '~/models/Animal/getAnimalsByUserId/index.server';
import deleteAnimalById from '~/models/Animal/deleteAnimalById/index.server';

jest.mock('~/models/Animal/getAnimalsByUserId/index.server');
jest.mock('~/models/Animal/deleteAnimalById/index.server');

jest.mock('~/services/auth/index.server', () => ({
  __esModule: true,
  authenticator: {
    isAuthenticated: jest.fn().mockResolvedValue(null)
  }
}));

const mock = {
  form: new FormData(),
  id: ANIMAL.id
};

mock.form.set('id', `${null}`);

describe('action', () => {
  let context = getContext({ request: { method: 'DELETE' } });
  const outOfWhitelistMethods = ['GET', 'POST', 'PUT', 'PATCH'];
  outOfWhitelistMethods.forEach((method) => {
    it(`return 400 when method is ${method}`, async () => {
      const context = getContext({ request: { method } });
      await action(context);
      expect(json).toBeCalledWith({}, 400);
    });
  });

  it('return 400 when request.formData is falsy', async () => {
    context.request.formData = jest.fn().mockResolvedValueOnce(null);
    await action(context);
    expect(json).toBeCalledWith({}, 400);
  });

  it('return 400 when request.formData.id is falsy', async () => {
    context.request.formData = jest.fn().mockResolvedValueOnce(mock.form);
    await action(context);
    expect(json).toBeCalledWith({}, 400);
  });

  it('return 401 when user is not login', async () => {
    mock.form.set('id', '123');
    context.request.formData = jest.fn().mockResolvedValueOnce(mock.form);
    await action(context);
    expect(json).toBeCalledWith({}, 401);
  });

  it('trigger deleteAnimalById', async () => {
    mock.form.set('id', `${mock.id}`);
    authenticator.isAuthenticated = jest.fn().mockResolvedValueOnce(User);
    context.request.formData = jest.fn().mockResolvedValueOnce(mock.form);
    await action(context);
    expect(deleteAnimalById).toBeCalledWith(mock.id, User);
  });

  it('return 500 when delete animal is failed', async () => {
    mock.form.set('id', `${mock.id}`);
    authenticator.isAuthenticated = jest.fn().mockResolvedValueOnce(User);
    context.request.formData = jest.fn().mockResolvedValueOnce(mock.form);
    (deleteAnimalById as jest.Mock).mockRejectedValueOnce(null);
    await action(context);
    expect(json).toBeCalledWith({}, 500);
  });

  it('return 204 when delete animal is succeeded', async () => {
    mock.form.set('id', `${mock.id}`);
    authenticator.isAuthenticated = jest.fn().mockResolvedValueOnce(User);
    context.request.formData = jest.fn().mockResolvedValueOnce(mock.form);
    (deleteAnimalById as jest.Mock).mockResolvedValueOnce(null);
    const result = await action(context);
    expect(result).toEqual(new Response(null, { status: 204 }));
  });
});

describe('loader', () => {
  const context = getContext({});

  it('return empty array when user is not authenticated', async () => {
    await loader(context);
    expect(json).toBeCalledWith({ user: undefined, animals: [] });
  });

  it('trigger getAnimalsByUserId', async () => {
    authenticator.isAuthenticated = jest.fn().mockResolvedValueOnce(User);
    await loader(context);
    expect(getAnimalsByUserId).toBeCalledWith(User.id);
  });

  it('return user and animals when user is authenticated', async () => {
    authenticator.isAuthenticated = jest.fn().mockResolvedValueOnce(User);
    (getAnimalsByUserId as jest.Mock).mockResolvedValueOnce(ANIMALS);
    await loader(context);
    expect(json).toBeCalledWith({ user: User, animals: ANIMALS });
  });
});
