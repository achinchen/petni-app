import type { User } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Layout from '~/components/common/Layout';
import Adoption from '~/features/adoption';

import { authenticator } from '~/services/auth/google.server';

type LoaderData = { user: User | null };

export let loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  const data: LoaderData = { user };
  return json(data);
};

export default function AdoptionRoutes() {
  const data = useLoaderData<LoaderData>();

  return (
    <Layout>
      <Adoption {...data} />
    </Layout>
  );
}
