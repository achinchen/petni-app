import type {
  LoaderFunction,
  ActionFunction,
  MetaFunction
} from '@remix-run/node';
import type { Animal } from '@prisma/client';
import { json, redirect } from '@remix-run/node';
import { Link, useLoaderData, useCatch, useParams } from '@remix-run/react';
import parsePayloadByJson from '~/utils/action/parsePayloadByFormData';
import { authenticator } from '~/services/auth/index.server';
import updateAnimalById from '~/models/animal/updateAnimalById/index.server';
import getAnimalById from '~/models/animal/getAnimalById/index.server';
import Loading from '~/components/common/LoadingAnimation';
import Layout from '~/components/common/Layout';
import EditAdoption from '~/features/adoption/edit';
import { DEFAULT_META } from '~/constants/meta';
import { APP_NAME } from '~/constants';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const user = await authenticator.isAuthenticated(request);
  if (!user) return json({}, 401);

  const payload: Animal = parsePayloadByJson({
    formData,
    fallback: null
  });
  if (!payload) return json({}, 500);

  const animal = await updateAnimalById(payload, user);
  if (!animal) return json({}, 500);

  return json({ animal });
};

export const meta: MetaFunction = ({
  data
}: {
  data: LoaderData | undefined;
}) => {
  if (!data) {
    return DEFAULT_META;
  }

  const { id, location } = data.animal;
  return {
    title: `編輯 No.${id} ｜ ${APP_NAME} - 陪你找家`,
    description: `No.${id} - 正在 ${location} 等家`
  };
};

type LoaderData = { animal: Animal };

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) return redirect('/');

  const animal = await getAnimalById(Number(params.id));

  if (!animal) {
    throw new Response(`找不到 No.${params.id} 的浪浪`, {
      status: 404
    });
  }

  const data: LoaderData = { animal };

  return json(data);
};

export default function PetRouter() {
  const data = useLoaderData<LoaderData>();

  return (
    <Layout withMobileHeader={false}>
      <EditAdoption animal={data.animal} />
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
