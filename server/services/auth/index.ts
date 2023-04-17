import type { User } from 'server/entities/user';
import { Authenticator } from 'remix-auth';
import { sessionStorage } from 'server/services/session';
import getGoogleStrategy from './google';

export const authenticator = new Authenticator<User>(sessionStorage);
authenticator.use(getGoogleStrategy());
