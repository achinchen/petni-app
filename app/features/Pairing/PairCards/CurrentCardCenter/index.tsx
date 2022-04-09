import { PLACEHOLDER } from './constants';

type Props = {
  isEmpty: boolean;
};

export default function CurrentCardCenter({ isEmpty }: Props) {
  return (
    <div
      flex="~"
      m="auto"
      w="64vmin sm:56vmin md:80"
      h="100vmin sm:80vmin md:118"
      // w="70vmin sm:56vmin md:80"
      // h="100vmin sm:80vmin md:118"
      // w="64vmin sm:107 md:100 lg:80"
      // h="110vmin sm:172 md:162 lg:118"
      bg="white"
      overflow="hidden"
      border="rounded-10"
      shadow="card-dark"
      transform="rotate-8 translate-y--4"
    >
      {isEmpty && (
        <div
          text="center"
          transform="rotate--8"
          whitespace="pre-line"
          color="status-active"
          m="auto"
        >
          {PLACEHOLDER}
        </div>
      )}
    </div>
  );
}
