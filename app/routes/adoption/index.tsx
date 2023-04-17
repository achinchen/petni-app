import type { Animal } from 'server/entities/animal';
import type { User } from 'server/entities/user';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { json, Response } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { authenticator } from 'server/services/auth';
import Layout from '~/components/common/Layout';
import Adoption from '~/features/adoption';
import { AnimalUseCase } from 'server/usecases/animal';
import { AnimalRepositoryPostgres } from 'server/gateways/animal/postgres';
import { AnimalController } from 'server/adapters/animal/index.controller';
import { AnimalPresenter } from 'server/adapters/animal/index.presenter';

const animalRepository = new AnimalRepositoryPostgres();
const animalUseCase = new AnimalUseCase(animalRepository);
const animalPresenter = new AnimalPresenter();
const animalController = new AnimalController(animalUseCase, animalPresenter);

export const action: ActionFunction = async ({ request }) => {
  const { method } = request;
  if (method !== 'DELETE') return json({}, 400);

  const formData = await request.formData();
  const animalId: Animal['id'] = Number(formData?.get('id'));
  const user = await authenticator.isAuthenticated(request);

  const [status] = await animalController.deleteAnimal(animalId, user?.id!);
  if (status !== 204) return json({}, status);
  return new Response(null, { status });
};

type LoaderData = { user: User | null; animals: Animal[] | null };

export let loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  const [status, animals] = await animalController.getCreated(user?.id!);
  const data = { animals, user } as LoaderData;
  return json(data, status);
};

export default function AdoptionRoutes() {
  const data = useLoaderData<LoaderData>();

  return (
    <Layout>
      <Adoption {...data} />
    </Layout>
  );
}
