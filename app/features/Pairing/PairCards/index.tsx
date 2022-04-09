import CurrentCard from './CurrentCard';
import RecommendCards from './RecommendCards';
import { usePairContext } from '~/features/Pairing/context';

export default function PairCards() {
  const { showPanel } = usePairContext();

  return (
    <section
      w="100%"
      h="100%"
      display="flex"
      flex="col"
      {...(showPanel && { display: 'none lg:flex' })}
    >
      <CurrentCard />
      <RecommendCards />
    </section>
  );
}
