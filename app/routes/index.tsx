import type { ActionFunction } from '@remix-run/node';
import type { Filter } from '~/utils/db/getAnimalsByFilter';
import { useEffect, useState } from 'react';
import { useTransition } from '@remix-run/react';
import PetPairing from '~/features/pairing';
import FullPageLoading from '~/components/common/FullPageLoading';
import Layout from '~/components/common/Layout';
import getAnimalsByFilter from '~/utils/db/getAnimalsByFilter';
import { json } from '@remix-run/node';

const LOADING_SECONDS = 1000 * 1.5;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const filter = formData.get('json') as Filter;
  const animals = await getAnimalsByFilter(filter);
  return json({ animals });
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
