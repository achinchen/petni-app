import BackCard from './BackCard';
import CenterCard from './CenterCard';
import FrontCard from './FrontCard';

export default function PairingCard() {
  const isEmpty = false;

  return (
    <div position="relative" flex="~ 1">
      <BackCard isEmpty={isEmpty} />
      <CenterCard isEmpty={isEmpty} />
      <FrontCard />
    </div>
  );
}
