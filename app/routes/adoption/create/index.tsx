import type { ActionFunction } from '@remix-run/node';
import type { CreatedAnimal } from '~/utils/db/createAnimal';
import { json } from '@remix-run/node';
import parsePayloadByJson from '~/utils/action/parsePayloadByFormData';
import createAnimal from '~/utils/db/createAnimal';
import Layout from '~/components/common/Layout';
import CreateAdoption from '~/features/adoption/create';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const payload: CreatedAnimal = parsePayloadByJson({
    formData,
    fallback: null
  });
  const animal = await createAnimal(payload);
  return json({ animal });
};

// export const action: ActionFunction = async ({ request }) => {
//   const formData = await request.formData();
//   const ids: AnimalId[] = parsePayloadByJson({ formData, fallback: [] });
//   if (!ids.length) return json({ animals: [] });

//   const animals = await getAnimalByIds(ids);
//   return json({ animals });
// };

export default function AdoptionCreate() {
  return (
    <Layout>
      <CreateAdoption />
    </Layout>
  );
}
