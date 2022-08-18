import EmptyBackCard from './EmptyCard';
import NonEmptyBackCard from './NonEmptyCard';

type Props = {
  isEmpty: boolean;
};

export default function BackCard({ isEmpty }: Props) {
  if (isEmpty) return <EmptyBackCard />;
  return <NonEmptyBackCard />;
}
