import type { LooseAnimal } from 'server/gateways/animal';
import { json, redirect } from '@remix-run/node';
import getContext from 'spec/utils/getContext';
import getJsonFormData from 'spec/utils/getJsonFormData';
import { controller } from 'spec/mock/server/adapters/animal/index.controller';
import { loader, action } from './index';
import { authenticator } from 'spec/utils/authenticator';
import { USER } from 'spec/mock/constants/user';
import { ANIMAL } from 'spec/mock/constants/animal';

jest.mock('server/gateways/animal/postgres/index');

describe('action', () => {
  let context = getContext({
    request: { formData: jest.fn() }
  });

  const animal = {
    family: ANIMAL.family
  } as LooseAnimal;

  it('return 400 when request.formData is falsy', async () => {
    context.request.formData = jest.fn().mockResolvedValueOnce(null);
    controller.createAnimal.mockResolvedValue([400]);
    await action(context);
    expect(json).toBeCalledWith({}, 400);
  });

  it('return 403 when user is not authenticated', async () => {
    context.request.formData = jest
      .fn()
      .mockResolvedValueOnce(getJsonFormData(1));
    controller.createAnimal.mockResolvedValue([403]);
    await action(context);
    expect(json).toBeCalledWith({}, 403);
  });

  it('return 404 when id is falsy', async () => {
    context.request.formData = jest
      .fn()
      .mockResolvedValueOnce(getJsonFormData(null));
    authenticator.isAuthenticated.mockResolvedValueOnce(USER);
    controller.createAnimal.mockResolvedValue([404]);
    await action(context);
    expect(json).toBeCalledWith({}, 404);
  });

  it('trigger createAnimal', async () => {
    context.request.formData = jest
      .fn()
      .mockResolvedValueOnce(getJsonFormData(animal));
    authenticator.isAuthenticated.mockResolvedValueOnce(USER);
    controller.createAnimal.mockResolvedValue([200]);
    await action(context);
    expect(controller.createAnimal).toBeCalledWith(animal, USER.id);
  });

  it('return 500 when create animal is failed', async () => {
    context.request.formData = jest
      .fn()
      .mockResolvedValueOnce(getJsonFormData(animal));
    authenticator.isAuthenticated.mockResolvedValueOnce(USER);
    controller.createAnimal.mockResolvedValueOnce([500]);
    await action(context);
    expect(json).toBeCalledWith({}, 500);
  });

  it('return animal when create animal is succeeded', async () => {
    context.request.formData = jest
      .fn()
      .mockResolvedValueOnce(getJsonFormData(animal));
    authenticator.isAuthenticated.mockResolvedValueOnce(USER);
    controller.createAnimal.mockResolvedValueOnce([200, ANIMAL]);
    await action(context);
    expect(json).toBeCalledWith({ animal: ANIMAL });
  });
});

describe('loader', () => {
  const context = getContext({});
  it('redirect /when user is not authenticated', async () => {
    await loader(context);
    expect(redirect).toBeCalledWith('/');
  });

  it('return null when user is authenticated', async () => {
    authenticator.isAuthenticated.mockResolvedValueOnce(USER);
    await loader(context);
    expect(json).toBeCalledWith(null);
  });
});
