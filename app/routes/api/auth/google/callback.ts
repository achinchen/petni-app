import type { LoaderFunction } from '@remix-run/node';
import { authenticator } from 'server/services/auth';
import { PROVIDER_NAME } from 'server/services/auth/google';

export const loader: LoaderFunction = ({ request }) => {
  return authenticator.authenticate(PROVIDER_NAME, request, {
    successRedirect: '/adoption',
    failureRedirect: '/'
  });
};
