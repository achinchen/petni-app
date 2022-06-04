import { usePairContext } from '~/features/pairing/context';
import BackCard from './BackCard';
import CenterCard from './CenterCard';
import FrontCard from './FrontCard';

export default function PairingCard() {
  const { currentCard, onNext } = usePairContext();

  const isEmpty = !currentCard;

  return (
    <div position="relative" flex="~ 1">
      <BackCard isEmpty={isEmpty} />
      <CenterCard isEmpty={isEmpty} />
      {currentCard && <FrontCard currentCard={currentCard} onNext={onNext} />}
    </div>
  );
}
