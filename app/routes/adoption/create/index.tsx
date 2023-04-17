import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import type { Animal } from 'server/entities/animal';
import { json, redirect } from '@remix-run/node';
import { authenticator } from 'server/services/auth';
import { AnimalUseCase } from 'server/usecases/animal';
import { AnimalRepositoryPostgres } from 'server/gateways/animal/postgres';
import { AnimalController } from 'server/adapters/animal/index.controller';
import { AnimalPresenter } from 'server/adapters/animal/index.presenter';
import parsePayloadByJson from '~/utils/action/parsePayloadByFormData';
import Layout from '~/components/common/Layout';
import CreateAdoption from '~/features/adoption/edit';

const animalRepository = new AnimalRepositoryPostgres();
const animalUseCase = new AnimalUseCase(animalRepository);
const animalPresenter = new AnimalPresenter();
const animalController = new AnimalController(animalUseCase, animalPresenter);

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const user = await authenticator.isAuthenticated(request);
  const payload: Animal = parsePayloadByJson({
    formData,
    fallback: null
  });

  const [status, animal] = await animalController.createAnimal(
    payload,
    user?.id!
  );

  if (!animal) return json({}, status);

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
