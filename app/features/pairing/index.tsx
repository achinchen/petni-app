import Loading from '~/components/common/LoadingAnimation';
import ControlPanel from './ControlPanel';
import PairCards from './Cards';
import Portal from './Portal';
import { PairingContextProvider, usePairContext } from './context';

export function Pairing() {
  const { isLoading } = usePairContext();

  return (
    <main flex="~" className="content-height">
      <Portal />
      <ControlPanel />
      {isLoading ? <Loading /> : <PairCards />}
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
