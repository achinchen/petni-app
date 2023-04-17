import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import type { AnimalInfo } from 'server/adapters/animal/index.presenter';
import {
  Link as RemixLink,
  useLoaderData,
  useCatch,
  useParams
} from '@remix-run/react';
import { redirect, json } from '@remix-run/node';
import Pet from '~/features/pet';
import Layout from '~/components/common/Layout';
import Loading from '~/components/common/LoadingAnimation';
import { AnimalUseCase } from 'server/usecases/animal';
import { AnimalFollowRepositoryPostgres } from 'server/gateways/animal-follow/postgres';
import { AnimalRepositoryPostgres } from 'server/gateways/animal/postgres';
import { AnimalController } from 'server/adapters/animal/index.controller';
import { AnimalPresenter } from 'server/adapters/animal/index.presenter';
import { authenticator } from 'server/services/auth';
import getMetaBaseByAnimal from '~/utils/seo/getMetaBaseByAnimal';

const animalRepository = new AnimalRepositoryPostgres();
const animalFollowRepositoryPostgres = new AnimalFollowRepositoryPostgres();
const animalUseCase = new AnimalUseCase(
  animalRepository,
  animalFollowRepositoryPostgres
);
const animalPresenter = new AnimalPresenter();
const animalController = new AnimalController(animalUseCase, animalPresenter);

export const meta: MetaFunction = ({
  data
}: {
  data: LoaderData | undefined;
}) => {
  return getMetaBaseByAnimal({ animal: data?.pet });
};

export type LoaderData = { pet: AnimalInfo };

export const loader: LoaderFunction = async ({ request, params: { id } }) => {
  if (!id) return redirect('/');

  const user = await authenticator.isAuthenticated(request);
  const [status, animal] = await animalController.getInfo(Number(id), user?.id);

  if (!animal) return json(`找不到 No.${id} 的浪浪`, status);

  const data: LoaderData = {
    pet: animal as AnimalInfo
  };

  return json(data);
};

export default function PetRouter() {
  const data = useLoaderData<LoaderData>();

  return (
    <Layout withHeader={false}>
      <Pet pet={data.pet} />
    </Layout>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const { id } = useParams();
  if (caught.status === 404) {
    return (
      <div flex="~ col" items="center">
        <Loading />
        <span my="4">沒有找到 No.{id} 的浪浪</span>
        <RemixLink to="/" className="underline">
          點這裡來去配對更多浪浪吧！
        </RemixLink>
      </div>
    );
  }
  throw new Error(`Unhandled error: ${caught.status}`);
}
