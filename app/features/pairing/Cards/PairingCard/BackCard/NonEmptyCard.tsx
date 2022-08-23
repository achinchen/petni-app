export default function NonEmptyBackCard() {
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
