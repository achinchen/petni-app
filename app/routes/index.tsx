import { useEffect, useState } from 'react';
import Layout from '~/components/Layout';
import Pairing from '~/features/Pairing';
import FullPageLoading from '~/components/common/FullPageLoading';

const LOADING_SECONDS = 1000 * 1.5;

export default function Index() {
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoaded(true), LOADING_SECONDS);
  }, []);

  return loaded ? (
    <Layout>
      <Pairing />
    </Layout>
  ) : (
    <FullPageLoading />
  );
}
