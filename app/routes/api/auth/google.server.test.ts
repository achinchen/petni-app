import type { DataFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { action, loader } from './google';
import { authenticator } from '~/services/auth/index.server';
import { PROVIDER_NAME } from '~/services/auth/google.server';

const mock = {
  request: new Request(''),
  result: 'result'
};

const context = { request: mock.request } as DataFunctionArgs;

jest.mock('~/services/auth/index.server', () => ({
  __esModule: true,
  authenticator: {
    authenticate: jest.fn(() => mock.result)
  }
}));

describe('action', () => {
  let result: string;
  beforeEach(() => {
    result = action(context);
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
