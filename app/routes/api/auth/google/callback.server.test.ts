import type { DataFunctionArgs } from '@remix-run/node';
import { authenticator } from '~/services/auth/index.server';
import { loader } from './callback';
import { PROVIDER_NAME } from '~/services/auth/google.server';

const mock = {
  request: new Request(''),
  result: 'result'
};

jest.mock('~/services/auth/index.server', () => ({
  __esModule: true,
  authenticator: {
    authenticate: jest.fn(() => mock.result)
  }
}));

describe('loader', () => {
  let result: string;
  beforeEach(() => {
    result = loader({ request: mock.request } as DataFunctionArgs);
  });

  test('trigger authenticator.authenticate', () => {
    expect(authenticator.authenticate).toBeCalledWith(
      PROVIDER_NAME,
      mock.request,
      {
        successRedirect: '/adoption',
        failureRedirect: '/'
      }
    );
  });

  test('return result', () => {
    expect(result).toBe(mock.result);
  });
});
