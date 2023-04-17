import type { ActionFunction } from '@remix-run/node';
import type { Animal } from 'server/entities/animal';
import { json } from '@remix-run/node';
import { AnimalUseCase } from 'server/usecases/animal';
import { AnimalRepositoryPostgres } from 'server/gateways/animal/postgres';
import { AnimalController } from 'server/adapters/animal/index.controller';
import { AnimalPresenter } from 'server/adapters/animal/index.presenter';
import parsePayloadByJson from '~/utils/action/parsePayloadByFormData';
import FavoritesFeature from '~/features/favorites';
import Layout from '~/components/common/Layout';

const animalRepository = new AnimalRepositoryPostgres();
const animalUseCase = new AnimalUseCase(animalRepository);
const animalPresenter = new AnimalPresenter();
const animalController = new AnimalController(animalUseCase, animalPresenter);

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const ids: Animal['id'][] = parsePayloadByJson({ formData, fallback: [] });
  const [status, animals] = await animalController.getFavorites(ids);
  if (!animals) return json({ animals: [] }, status);

  return json({ animals });
};

export default function Favorites() {
  return (
    <Layout>
      <FavoritesFeature />
    </Layout>
  );
}
