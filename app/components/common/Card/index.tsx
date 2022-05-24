import type { AttributifyOptions } from '@unocss/preset-attributify';

type Props = {
  children: JSX.Element;
} & AttributifyOptions;

export default function Card({ children, ...attributifyOptions }: Props) {
  return (
    <div
      p="6"
      border="rounded-5"
      bg="white"
      shadow="default"
      {...attributifyOptions}
    >
      {children}
    </div>
  );
}
