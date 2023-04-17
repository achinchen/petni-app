import type { DataFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { action, loader } from './google';
import { authenticator } from 'spec/utils/authenticator';
import { PROVIDER_NAME } from 'server/services/auth/google';
import { USER } from 'spec/mock/constants/user';

const mock = {
  request: new Request(''),
  result: USER
};

const context = { request: mock.request } as DataFunctionArgs;

describe('action', () => {
  let result: string;

  beforeEach(async () => {
    authenticator.authenticate.mockResolvedValueOnce(mock.result);
    result = await action(context);
  });

  test('trigger authenticator.authenticate', () => {
    expect(authenticator.authenticate).toBeCalledWith(
      PROVIDER_NAME,
      mock.request
    );
  });

  test('return result', () => {
    expect(result).toBe(mock.result);
  });
});

describe('loader', () => {
  test('trigger redirect', () => {
    loader(context);
    expect(redirect).toBeCalledWith('/');
  });
});
