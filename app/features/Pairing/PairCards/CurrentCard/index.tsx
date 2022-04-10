import CurrentCardBack from '~/features/Pairing/PairCards/CurrentCardBack';
import CurrentCardCenter from '~/features/Pairing/PairCards/CurrentCardCenter';
import CurrentCardFront from '~/features/Pairing/PairCards/CurrentCardFront';

export default function CurrentCard() {
  const isEmpty = false;
  return (
    <div position="relative" flex="~ 1">
      <CurrentCardBack isEmpty={isEmpty} />
      <CurrentCardCenter isEmpty={isEmpty} />
      <CurrentCardFront />
    </div>
  );
}
