import type { User } from '@prisma/client';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import type { SimpleAnimal, AnimalId } from '~/models/Animal/type';
import { json, Response } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { authenticator } from '~/services/auth/index.server';
import getAnimalByUserId from '~/models/Animal/getAnimalsByUserId/index.server';
import deleteAnimalById from '~/models/Animal/deleteAnimalById/index.server';
import Layout from '~/components/common/Layout';
import Adoption from '~/features/adoption';

export const action: ActionFunction = async ({ request }) => {
  const { method } = request;
  if (method !== 'DELETE') return json({}, 400);

  const user = await authenticator.isAuthenticated(request);
  if (!user) return json({}, 401);

  const formData = await request.formData();
  const id: AnimalId = Number(formData.get('id'));
  if (!id) return json({}, 500);

  try {
    await deleteAnimalById(id, user);
    return new Response(null, { status: 204 });
  } catch {
    return json({}, 500);
  }
};

type LoaderData = { user: User | null; animals: SimpleAnimal[] };

export let loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  const animals = user ? await getAnimalByUserId(user.id) : [];

  const data: LoaderData = { user, animals };
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
