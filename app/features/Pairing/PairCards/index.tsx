import Main from './Main';
import RecommendCards from './RecommendCards';

export default function PairCards() {
  return (
    <section flex="~ col" justify="between" w="100%">
      <Main />
      <RecommendCards />
    </section>
  );
}
