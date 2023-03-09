import type { User } from '@prisma/client';
import { Authenticator } from 'remix-auth';
import { sessionStorage } from 'server/services/session/index.server';
import getGoogleStrategy from './google.server';

export const authenticator = new Authenticator<User>(sessionStorage);
authenticator.use(getGoogleStrategy());
