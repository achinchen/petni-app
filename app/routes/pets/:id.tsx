import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import type { Pet as PetType } from '~/features/pet/types';
import Pet from '~/features/pet';
import Layout from '~/components/common/Layout';
import { db } from '~/utils/db.server';

export const meta: MetaFunction = ({
  data
}: {
  data: LoaderData | undefined;
}) => {
  if (!data) {
    return {
      title: 'Petni - 陪你找家',
      description: 'Petni - 台灣浪浪領養平台'
    };
  }

  const { id, location } = data.pet;
  return {
    title: `No.${id} ｜ Petni - 陪你找家`,
    description: `No.${id} - 正在 ${location} 等家`
  };
};

type LoaderData = { pet: PetType };

export const loader: LoaderFunction = async ({ request, params }) => {
  const result = await db.animal.findUnique({
    where: { id: Number(params.id) },
    include: { _count: { select: { follows: true } } }
  });

  if (!result) {
    throw new Response(`找不到 No.${params.id} 的浪浪`, {
      status: 404
    });
  }

  const { _count, ...pet } = result;
  const data: LoaderData = { pet: Object.assign(pet, _count) };

  return json(data);
};

export default function PetRouter() {
  const data = useLoaderData<LoaderData>();

  return (
    <Layout withMobileHeader={false}>
      <Pet pet={data.pet} />
    </Layout>
  );
}
