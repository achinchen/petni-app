import { GoogleStrategy, SCOPE } from './index.strategy';

const verify = jest.fn();
const callbackURL = 'https://example.app/callback';

describe('initialization', () => {
  let response = {} as Response;
  let location;
  let redirectUrl: URL;

  beforeEach(async () => {
    const strategy = new GoogleStrategy(
      {
        clientID: 'CLIENT_ID',
        clientSecret: 'CLIENT_SECRET',
        callbackURL
      },
      verify
    );

    const request = new Request('https://example.app/auth/google');
    await strategy
      .authenticate(
        request,
        {
          getSession: jest
            .fn()
            .mockResolvedValue({ get: jest.fn(), set: jest.fn() }),
          commitSession: jest.fn(),
          destroySession: jest.fn()
        },
        {
          sessionKey: 'user'
        }
      )
      .catch((error) => {
        response = error as Response;
      });
    location = response.headers.get('Location');
    redirectUrl = new URL(location!);
  });

  test('redirect with query scope', () => {
    const scopeQueryString = redirectUrl.searchParams.get('scope');
    Object.values(SCOPE).forEach((scope) => {
      expect(scopeQueryString).toContain(scope);
    });
  });

  test('redirect with authorization URL', () => {
    expect(redirectUrl.hostname).toBe('accounts.google.com');
    expect(redirectUrl.pathname).toBe('/o/oauth2/v2/auth');
  });

  test('redirect with redirectUrl', () => {
    const redirectURI = redirectUrl.searchParams.get('redirect_uri');
    expect(redirectURI).toBe(callbackURL);
  });
});
