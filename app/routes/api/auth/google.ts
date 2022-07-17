import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { authenticator, PROVIDER_NAME } from '~/services/auth/google.server';

export const action: ActionFunction = ({ request }) => {
  return authenticator.authenticate(PROVIDER_NAME, request);
};

export const loader: LoaderFunction = () => redirect('/');
