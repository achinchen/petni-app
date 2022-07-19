import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import type { EditingAnimal } from '~/models/animal/type';
import { json, redirect } from '@remix-run/node';
import { authenticator } from '~/services/auth/index.server';
import parsePayloadByJson from '~/utils/action/parsePayloadByFormData';
import createAnimal from '~/models/animal/createAnimal/index.server';
import Layout from '~/components/common/Layout';
import CreateAdoption from '~/features/adoption/edit';

export const action: ActionFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) return json({}, 401);

  const formData = await request.formData();
  const payload: EditingAnimal = parsePayloadByJson({
    formData,
    fallback: null
  });

  if (!payload) return json({}, 403);

  const animal = await createAnimal(payload, user);
  return json({ animal });
};

export let loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) return redirect('/');
  return json(null);
};

export default function AdoptionCreate() {
  return (
    <Layout>
      <CreateAdoption />
    </Layout>
  );
}
