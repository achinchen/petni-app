import { json, Response } from '@remix-run/node';
import { controller } from 'spec/mock/server/adapters/animal/index.controller';
import { action, loader } from './index';
import getContext from 'spec/utils/getContext';
import { ANIMAL, ANIMALS } from 'spec/mock/constants/animal';
import { USER } from 'spec/mock/constants/user';
import { authenticator } from 'spec/utils/authenticator';

jest.mock('server/gateways/animal/postgres/index');

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
    controller.deleteAnimal.mockResolvedValueOnce([400]);
    await action(context);
    expect(json).toBeCalledWith({}, 400);
  });

  it('return 403 when user is not login', async () => {
    mock.form.set('id', '123');
    context.request.formData = jest.fn().mockResolvedValueOnce(mock.form);
    authenticator.isAuthenticated.mockResolvedValueOnce(null!);
    controller.deleteAnimal.mockResolvedValueOnce([403]);
    await action(context);
    expect(json).toBeCalledWith({}, 403);
  });

  it('trigger deleteAnimalById', async () => {
    mock.form.set('id', `${mock.id}`);
    authenticator.isAuthenticated.mockResolvedValueOnce(USER);
    context.request.formData = jest.fn().mockResolvedValueOnce(mock.form);
    controller.deleteAnimal.mockResolvedValueOnce([204]);
    await action(context);
    expect(controller.deleteAnimal).toBeCalledWith(mock.id, USER.id);
  });

  it('return 500 when delete animal is failed', async () => {
    mock.form.set('id', `${mock.id}`);
    authenticator.isAuthenticated.mockResolvedValueOnce(USER);
    context.request.formData = jest.fn().mockResolvedValueOnce(mock.form);
    controller.deleteAnimal.mockResolvedValueOnce([500]);
    await action(context);
    expect(json).toBeCalledWith({}, 500);
  });

  it('return 204 when delete animal is succeeded', async () => {
    mock.form.set('id', `${mock.id}`);
    authenticator.isAuthenticated.mockResolvedValueOnce(USER);
    context.request.formData = jest.fn().mockResolvedValueOnce(mock.form);
    controller.deleteAnimal.mockResolvedValueOnce([204]);
    const result = await action(context);
    expect(result).toEqual(new Response(null, { status: 204 }));
  });
});

describe('loader', () => {
  const context = getContext({});

  it('return 403 when user is not authenticated', async () => {
    controller.getCreated.mockResolvedValueOnce([403]);
    await loader(context);
    expect(json).toBeCalledWith({ user: undefined }, 403);
  });

  it('trigger getAnimalsByUserId', async () => {
    authenticator.isAuthenticated.mockResolvedValueOnce(USER);
    controller.getCreated.mockResolvedValueOnce([200, ANIMALS]);
    await loader(context);
    expect(controller.getCreated).toBeCalledWith(USER.id);
  });

  it('return user and animals when user is authenticated', async () => {
    authenticator.isAuthenticated.mockResolvedValueOnce(USER);
    controller.getCreated.mockResolvedValueOnce([200, ANIMALS]);
    await loader(context);
    expect(json).toBeCalledWith({ user: USER, animals: ANIMALS }, 200);
  });
});
