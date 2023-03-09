import type { StrategyVerifyCallback } from 'remix-auth';
import type {
  OAuth2Profile,
  OAuth2StrategyVerifyParams
} from 'remix-auth-oauth2';
import { OAuth2Strategy } from 'remix-auth-oauth2';

export const PROVIDER_NAME = 'google';

export const SCOPE = {
  USER_INFO: 'https://www.googleapis.com/auth/userinfo.profile',
  USER_EMAIL: 'https://www.googleapis.com/auth/userinfo.email'
};

const ENDPOINT = {
  USER_PROFILE: 'https://www.googleapis.com/oauth2/v2/userinfo'
};

export interface GoogleStrategyOptions {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  scope?: string;
}

export interface Auth0ExtraParams extends Record<string, string | number> {
  id_token: string;
  scope: string;
  expires_in: 86_400;
  token_type: 'Bearer';
}

export interface Auth0Profile extends OAuth2Profile {
  id: string;
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
    middleName: string;
  };
  emails: Array<{ value: string }>;
  photos: Array<{ value: string }>;
  _json: {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    middle_name: string;
    nickname: string;
    preferred_username: string;
    profile: string;
    picture: string;
    website: string;
    email: string;
    email_verified: boolean;
    gender: string;
    birthdate: string;
    zoneinfo: string;
    locale: string;
    phone_number: string;
    phone_number_verified: boolean;
    address: {
      country: string;
    };
    updated_at: string;
  };
}

export class GoogleStrategy<User> extends OAuth2Strategy<
  User,
  Auth0Profile,
  Auth0ExtraParams
> {
  name = PROVIDER_NAME;
  private scope: string;
  private userProfileURL: string;

  constructor(
    { clientID, clientSecret, callbackURL, scope }: GoogleStrategyOptions,
    verify: StrategyVerifyCallback<
      User,
      OAuth2StrategyVerifyParams<Auth0Profile, Auth0ExtraParams>
    >
  ) {
    super(
      {
        authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenURL: 'https://oauth2.googleapis.com/token',
        clientID,
        clientSecret,
        callbackURL
      },
      verify
    );

    this.scope = scope ?? `${SCOPE.USER_INFO} ${SCOPE.USER_EMAIL}`;
    this.userProfileURL = ENDPOINT.USER_PROFILE;
  }

  protected authorizationParams() {
    const urlSearchParams: Record<string, string> = {
      scope: this.scope
    };

    return new URLSearchParams(urlSearchParams);
  }

  protected async userProfile(accessToken: string): Promise<Auth0Profile> {
    const response = await fetch(this.userProfileURL, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const data: Auth0Profile['_json'] = await response.json();

    const profile: Auth0Profile = {
      provider: PROVIDER_NAME,
      displayName: data.name,
      id: data.sub,
      name: {
        familyName: data.family_name,
        givenName: data.given_name,
        middleName: data.middle_name
      },
      emails: [{ value: data.email }],
      photos: [{ value: data.picture }],
      _json: data
    };

    return profile;
  }
}
