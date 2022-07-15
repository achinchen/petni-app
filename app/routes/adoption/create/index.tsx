import type { ActionFunction } from '@remix-run/node';
import type { EditingAnimal } from '~/models/animal/type';
import { json } from '@remix-run/node';
import parsePayloadByJson from '~/utils/action/parsePayloadByFormData';
import createAnimal from '~/models/animal/createAnimal/index.server';
import Layout from '~/components/common/Layout';
import CreateAdoption from '~/features/adoption/edit';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const payload: EditingAnimal = parsePayloadByJson({
    formData,
    fallback: null
  });

  if (!payload) return json({}, 500);

  const animal = await createAnimal(payload);
  return json({ animal });
};

export default function AdoptionCreate() {
  return (
    <Layout>
      <CreateAdoption />
    </Layout>
  );
}
