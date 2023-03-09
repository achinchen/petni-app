import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { authenticator } from 'server/services/auth/index.server';
import { PROVIDER_NAME } from 'server/services/auth/google.server';

export const action: ActionFunction = ({ request }) => {
  return authenticator.authenticate(PROVIDER_NAME, request);
};

export const loader: LoaderFunction = () => redirect('/');
