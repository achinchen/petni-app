import { useEffect, useState } from 'react';
import Loading from '~/components/common/LoadingAnimation';
import ControlPanel from './ControlPanel';
import PairCards from './Cards';
import Portal from './Portal';
import { PairingContextProvider, usePairContext } from './context';

export function Pairing() {
  const { isLoading, showPanel } = usePairContext();
  const [init, setInit] = useState(false);

  const showLoading = isLoading || !init;

  useEffect(() => {
    setTimeout(() => setInit(true), 0);
  }, []);

  return (
    <section
      w="100%"
      h="100%"
      display="flex"
      flex="col"
      {...(showPanel && { display: 'none lg:flex' })}
    >
      <Loading visible={showLoading} />
      {!showLoading && <PairCards />}
    </section>
  );
}

export default function PairingWithProvider() {
  return (
    <main flex="~" className="content-height">
      <Portal />
      <ControlPanel />
      <PairingContextProvider>
        <Pairing />
      </PairingContextProvider>
    </main>
  );
}
