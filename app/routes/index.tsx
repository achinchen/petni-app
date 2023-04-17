import type { ActionFunction } from '@remix-run/node';
import type { Options } from 'server/gateways/animal';
import { useEffect, useState } from 'react';
import { json } from '@remix-run/node';
import { AnimalUseCase } from 'server/usecases/animal';
import { AnimalRepositoryPostgres } from 'server/gateways/animal/postgres';
import { AnimalController } from 'server/adapters/animal/index.controller';
import { AnimalPresenter } from 'server/adapters/animal/index.presenter';
import parsePayloadByFormData from '~/utils/action/parsePayloadByFormData';
import PetPairing from '~/features/pairing';
import FullPageLoading from '~/components/common/FullPageLoading';
import Layout from '~/components/common/Layout';

const LOADING_SECONDS = 1_500;

const animalRepository = new AnimalRepositoryPostgres();
const animalUseCase = new AnimalUseCase(animalRepository);
const animalPresenter = new AnimalPresenter();
const animalController = new AnimalController(animalUseCase, animalPresenter);

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const options: Options = parsePayloadByFormData({ formData, fallback: {} });
  const [status, animals] = await animalController.getFiltered(options);
  if (!animals) return json({ animals: [] }, status);
  return json({ animals }, status);
};

export default function Index() {
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoaded(true), LOADING_SECONDS);
  }, []);

  return loaded ? (
    <Layout>
      <PetPairing />
    </Layout>
  ) : (
    <FullPageLoading />
  );
}
