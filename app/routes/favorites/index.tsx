import type { ActionFunction } from '@remix-run/node';
import type { AnimalId } from '~/models/animal/type';
import { json } from '@remix-run/node';
import getAnimalByIds from '~/models/animal/getAnimalsByIds/index.server';
import parsePayloadByJson from '~/utils/action/parsePayloadByFormData';
import FavoritesFeature from '~/features/favorites';
import Layout from '~/components/common/Layout';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  if (!formData) return json(400);

  const ids: AnimalId[] = parsePayloadByJson({ formData, fallback: [] });
  if (!ids.length) return json({ animals: [] });

  const animals = await getAnimalByIds(ids);
  return json({ animals });
};

export default function Favorites() {
  return (
    <Layout>
      <FavoritesFeature />
    </Layout>
  );
}
