import type { Animal } from '@prisma/client';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { useEffect, useState } from 'react';
import PetPairing from '~/features/pairing';
import FullPageLoading from '~/components/common/FullPageLoading';
import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import Layout from '~/components/common/Layout';
import { db } from '~/utils/db.server';
import { DEFAULT_META } from '~/constants/meta';

export const meta: MetaFunction = ({
  data
}: {
  data: LoaderData | undefined;
}) => {
  return DEFAULT_META;
};

type LoaderData = { animals: Animal[] };

export const loader: LoaderFunction = async () => {
  const animals = await db.$queryRaw<
    Animal[]
  >`SELECT * FROM "Animal" ORDER BY random() LIMIT 6`;
  return json({ animals });
};

const LOADING_SECONDS = 1000 * 1.5;

export default function Index() {
  const [loaded, setLoaded] = useState(true);
  const data = useLoaderData<LoaderData>();

  useEffect(() => {
    setTimeout(() => setLoaded(true), LOADING_SECONDS);
  }, []);

  return loaded ? (
    <Layout>
      <PetPairing animals={data.animals} />
    </Layout>
  ) : (
    <FullPageLoading />
  );
}
