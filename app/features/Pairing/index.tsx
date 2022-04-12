import Loading from '~/components/common/LoadingAnimation';
import ControlPanel from './ControlPanel';
import PairCards from './Cards';
import Portal from './Portal';
import { PairingContextProvider } from './context';

export default function Pairing() {
  const isLoading = false;

  return (
    <PairingContextProvider>
      <main
        flex="~"
        h="[calc(100vh-160px)] sm:[calc(100vh-120px)] lg:[calc(100vh-80px)]"
      >
        <Portal />
        <ControlPanel />
        {isLoading ? <Loading /> : <PairCards />}
      </main>
    </PairingContextProvider>
  );
}
