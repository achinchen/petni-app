import { Fragment } from 'react';

export default function MainCardPlaceholder() {
  return (
    <Fragment>
      <div
        position="absolute"
        left="1/2"
        w="72"
        h="118"
        bg="white"
        overflow="hidden"
        border="rounded-10"
        shadow="card-light"
        transform="scale-x-80 scale-y-80 rotate-16 translate-x-16 translate-y-8"
      />
      <div
        position="absolute"
        left="1/2"
        m="auto"
        w="72"
        h="118"
        bg="white"
        overflow="hidden"
        border="rounded-10"
        shadow="card-dark"
        transform="rotate-8 scale-y-95 translate-x-6 translate-y--4"
      />
    </Fragment>
  );
}
