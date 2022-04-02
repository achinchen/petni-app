import { useEffect, useState } from 'react';
import Pairing from '~/features/Pairing';
import CreditLoading from '~/components/credit-loading';

const LOADING_SECONDS = 1000 * 1.5;

export default function Index() {
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoaded(true), LOADING_SECONDS);
  }, []);

  return loaded ? <Pairing /> : <CreditLoading />;
}
