import type { ActionFunction } from '@remix-run/node';
import type { Filter } from '~/models/animal/getAnimalsByFilter/index.server';
import { useEffect, useState } from 'react';
import PetPairing from '~/features/pairing';
import FullPageLoading from '~/components/common/FullPageLoading';
import Layout from '~/components/common/Layout';
import getAnimalsByFilter from '~/models/animal/getAnimalsByFilter/index.server';
import parsePayloadByFormData from '~/utils/action/parsePayloadByFormData';
import { json } from '@remix-run/node';

const LOADING_SECONDS = 1000 * 1.5;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const filter: Filter = parsePayloadByFormData({ formData, fallback: {} });
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
