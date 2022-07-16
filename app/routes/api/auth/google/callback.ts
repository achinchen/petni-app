import type { LoaderFunction } from '@remix-run/node';
import { authenticator, PROVIDER_NAME } from '~/services/auth/google.server';

export let loader: LoaderFunction = ({ request }) => {
  return authenticator.authenticate(PROVIDER_NAME, request, {
    successRedirect: '/adoption',
    failureRedirect: '/'
  });
};
