import type { EditingAnimal } from '~/models/Animal/type';
import { json, redirect } from '@remix-run/node';
import getContext from 'spec/utils/getContext';
import getJsonFormData from 'spec/utils/getJsonFormData';
import { loader, action } from './index';
import { authenticator } from 'spec/utils/authenticator';
import createAnimal from '~/models/Animal/createAnimal/index.server';
import { USER } from 'spec/mock/constants/user';
import { ANIMAL } from 'spec/mock/constants/animal';

jest.mock('~/models/Animal/createAnimal/index.server');

describe('action', () => {
  let context = getContext({
    request: { formData: jest.fn() }
  });

  const editAnimal = {
    family: ANIMAL.family
  } as EditingAnimal;

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
    expect(json).toBeCalledWith({}, 403);
  });

  it('trigger createAnimal', async () => {
    context.request.formData = jest
      .fn()
      .mockResolvedValueOnce(getJsonFormData(editAnimal));
    authenticator.isAuthenticated.mockResolvedValueOnce(USER);
    await action(context);
    expect(createAnimal).toBeCalledWith(editAnimal, USER);
  });

  it('return 500 when create animal is failed', async () => {
    context.request.formData = jest
      .fn()
      .mockResolvedValueOnce(getJsonFormData(editAnimal));
    authenticator.isAuthenticated.mockResolvedValueOnce(USER);
    (createAnimal as jest.Mock).mockResolvedValueOnce(null);
    await action(context);
    expect(json).toBeCalledWith({}, 500);
  });

  it('return animal when create animal is succeeded', async () => {
    context.request.formData = jest
      .fn()
      .mockResolvedValueOnce(getJsonFormData(editAnimal));
    authenticator.isAuthenticated.mockResolvedValueOnce(USER);
    (createAnimal as jest.Mock).mockResolvedValueOnce(ANIMAL);
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
