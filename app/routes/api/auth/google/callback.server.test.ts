import getContext from 'spec/utils/getContext';
import { authenticator } from 'spec/utils/authenticator';
import { loader } from './callback';
import { PROVIDER_NAME } from 'server/services/auth/google';
import { USER } from 'spec/mock/constants/user';

const mock = {
  request: new Request(''),
  result: USER
};

describe('loader', () => {
  let result: string;
  const context = getContext({ request: mock.request });

  beforeEach(async () => {
    authenticator.authenticate.mockResolvedValueOnce(mock.result);
    result = await loader(context);
  });

  it('trigger authenticator.authenticate', () => {
    expect(authenticator.authenticate).toBeCalledWith(
      PROVIDER_NAME,
      mock.request,
      {
        successRedirect: '/adoption',
        failureRedirect: '/'
      }
    );
  });

  it('return result', () => {
    expect(result).toBe(mock.result);
  });
});
