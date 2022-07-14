import type { AttributifyAttributes } from '@unocss/preset-attributify';

type Props = {
  children: JSX.Element;
} & AttributifyAttributes;

export default function Card({ children, ...attributifyAttributes }: Props) {
  return (
    <div
      flex="~"
      justify="between"
      p="5"
      gap="4"
      h="fit"
      bg="white"
      border="rounded-3xl"
    >
      {children}
    </div>
  );
}
