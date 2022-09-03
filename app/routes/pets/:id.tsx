import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import type { Pet as PetType } from '~/features/pet/types';
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
import { authenticator } from '~/services/auth/index.server';
import getAnimalById from '~/models/animal/getAnimalById/index.server';
import { APP_NAME } from '~/constants';
import { DEFAULT_META } from '~/constants/meta';

export const meta: MetaFunction = ({
  data
}: {
  data: LoaderData | undefined;
}) => {
  if (!data) {
    return DEFAULT_META;
  }

  const { id, location } = data.pet;
  return {
    title: `No.${id} ｜ ${APP_NAME} - 陪你找家`,
    description: `No.${id} - 正在 ${location} 等家`
  };
};

export type LoaderData = { pet: PetType };

export const loader: LoaderFunction = async ({ request, params: { id } }) => {
  if (!id) return redirect('/');

  const user = await authenticator.isAuthenticated(request);
  const animal = await getAnimalById(Number(id), user?.id);

  if (!animal) return json(`找不到 No.${id} 的浪浪`, 404);

  const data: LoaderData = {
    pet: animal
  };

  return json(data);
};

export default function PetRouter() {
  const data = useLoaderData<LoaderData>();

  return (
    <Layout withHeader={false}>
      <Pet pet={data.pet as any} />
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
