import { PLACEHOLDER } from './constants';

type Props = {
  isEmpty: boolean;
};

export default function CenterCard({ isEmpty }: Props) {
  return (
    <div
      flex="~"
      m="auto"
      w="64vmin sm:56vmin md:80"
      h="100vmin sm:80vmin md:118"
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
