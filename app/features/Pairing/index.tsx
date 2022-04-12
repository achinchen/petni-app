import Panel from './Panel';
import PairCards from './PairCards';
import Portal from './Portal';
import Loading from '~/components/common/LoadingAnimation';
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
        <Panel />
        {isLoading ? <Loading /> : <PairCards />}
      </main>
    </PairingContextProvider>
  );
}
