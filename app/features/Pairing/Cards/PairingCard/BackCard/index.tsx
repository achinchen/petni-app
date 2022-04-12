type Props = {
  isEmpty: boolean;
};

function EmptyBackCard() {
  return (
    <div
      position="absolute"
      left="1/2"
      top="1/2"
      w="64vmin sm:94 md:80"
      h="105vmin sm:150 md:118"
      max-h="sm:150"
      bg="white"
      overflow="hidden"
      border="rounded-10"
      shadow="card-light"
      transform="
        translate-y--45% sm:translate-y--40%
        translate-x--40% sm:translate-x--40%
      "
      style={{ '--un-rotate': '10deg' }}
    />
  );
}

function NonEmptyBackCard() {
  return (
    <div
      position="absolute"
      left="1/2"
      top="1/2"
      w="64vmin sm:90 md:80"
      h="90vmin sm:100 md:100"
      bg="white"
      overflow="hidden"
      border="rounded-10"
      shadow="card-light"
      transform="
        translate-y--45% sm:translate-y--50% md:translate-y--50%
        translate-x--50% sm:translate-x--40% md:translate-x--50%
      "
      style={{ '--un-rotate': '16deg' }}
    />
  );
}

export default function BackCard({ isEmpty }: Props) {
  if (isEmpty) return <EmptyBackCard />;
  return <NonEmptyBackCard />;
}
