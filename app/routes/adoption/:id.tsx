import type {
  LoaderFunction,
  ActionFunction,
  MetaFunction
} from '@remix-run/node';
import type { Animal } from 'server/entities/animal';
import type { AnimalInfo } from 'server/adapters/animal/index.presenter';
import { json, redirect } from '@remix-run/node';
import { Link, useLoaderData, useCatch, useParams } from '@remix-run/react';
import parsePayloadByJson from '~/utils/action/parsePayloadByFormData';
import getMetaBaseByAnimal from '~/utils/seo/getMetaBaseByAnimal';
import { AnimalUseCase } from 'server/usecases/animal';
import { AnimalFollowRepositoryPostgres } from 'server/gateways/animal-follow/postgres';
import { AnimalRepositoryPostgres } from 'server/gateways/animal/postgres';
import { AnimalController } from 'server/adapters/animal/index.controller';
import { AnimalPresenter } from 'server/adapters/animal/index.presenter';
import { authenticator } from 'server/services/auth';
import Loading from '~/components/common/LoadingAnimation';
import Layout from '~/components/common/Layout';
import EditAdoption from '~/features/adoption/edit';

const animalRepository = new AnimalRepositoryPostgres();
const animalFollowRepositoryPostgres = new AnimalFollowRepositoryPostgres();
const animalUseCase = new AnimalUseCase(
  animalRepository,
  animalFollowRepositoryPostgres
);
const animalPresenter = new AnimalPresenter();
const animalController = new AnimalController(animalUseCase, animalPresenter);

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  if (!formData) return json({}, 400);

  const user = await authenticator.isAuthenticated(request);
  const payload: Animal = parsePayloadByJson({
    formData,
    fallback: null
  });

  const [status, animal] = await animalController.updateAnimal(
    payload,
    user?.id!
  );
  if (!animal) return json({}, status);

  return json({ animal });
};

export const meta: MetaFunction = ({ data }: { data: LoaderData }) => {
  return getMetaBaseByAnimal({
    animal: data.animal,
    prefix: { title: '編輯 ' }
  });
};

type LoaderData = { animal: AnimalInfo };

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) return redirect('/');

  const result = await animalController.getInfo(Number(params.id));
  const [status, animal] = result;
  if (!animal) {
    throw new Response(`找不到 No.${params.id} 的浪浪`, {
      status
    });
  }

  const data = { animal } as LoaderData;

  return json(data);
};

export default function PetRouter() {
  const data = useLoaderData<LoaderData>();

  return (
    <Layout withHeader={false}>
      <EditAdoption
        animal={{
          ...data.animal,
          openAt: data.animal.openAt ? new Date(data.animal.openAt) : '',
          createdAt: new Date(data.animal.createdAt),
          updatedAt: new Date(data.animal.updatedAt)
        }}
      />
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
        <Link to="/" className="underline">
          點這裡來去配對更多浪浪吧！
        </Link>
      </div>
    );
  }
  throw new Error(`Unhandled error: ${caught.status}`);
}
