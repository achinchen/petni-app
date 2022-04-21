import Loading from '~/components/common/LoadingAnimation';
import ControlPanel from './ControlPanel';
import PairCards from './Cards';
import Portal from './Portal';
import { PairingContextProvider } from './context';

export default function Pairing() {
  const isLoading = false;

  return (
    <PairingContextProvider>
      <main flex="~" className="content-height">
        <Portal />
        <ControlPanel />
        {isLoading ? <Loading /> : <PairCards />}
      </main>
    </PairingContextProvider>
  );
}
