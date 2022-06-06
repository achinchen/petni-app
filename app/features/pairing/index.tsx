import Loading from '~/components/common/LoadingAnimation';
import ControlPanel from './ControlPanel';
import PairCards from './Cards';
import Portal from './Portal';
import { PairingContextProvider, usePairContext } from './context';

export function Pairing() {
  const { isLoading, showPanel } = usePairContext();

  return (
    <main flex="~" className="content-height">
      <Portal />
      <ControlPanel />
      <section
        w="100%"
        h="100%"
        display="flex"
        flex="col"
        {...(showPanel && { display: 'none lg:flex' })}
      >
        {isLoading ? <Loading /> : <PairCards />}
      </section>
    </main>
  );
}

export default function PairingWithProvider() {
  return (
    <PairingContextProvider>
      <Pairing />
    </PairingContextProvider>
  );
}
