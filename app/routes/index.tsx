import type { ActionFunction } from '@remix-run/node';
import type { Options } from '~/models/Animal/getAnimalsByOptions/index.server';
import { useEffect, useState } from 'react';
import PetPairing from '~/features/pairing';
import FullPageLoading from '~/components/common/FullPageLoading';
import Layout from '~/components/common/Layout';
import getAnimalsByOptions from '~/models/Animal/getAnimalsByOptions/index.server';
import parsePayloadByFormData from '~/utils/action/parsePayloadByFormData';
import { json } from '@remix-run/node';

const LOADING_SECONDS = 1_500;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const options: Options = parsePayloadByFormData({ formData, fallback: {} });
  const animals = await getAnimalsByOptions(options);
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
