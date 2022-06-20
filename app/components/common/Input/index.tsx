import type { AttributifyOptions } from '@unocss/preset-attributify';

type Props = React.HTMLAttributes<HTMLInputElement> & AttributifyOptions;

export default function Input(props: Props) {
  return (
    <input
      d="block"
      w="100%"
      mt="2"
      p="3"
      bg="gray-50"
      border="none rounded-lg"
      text="sm"
      {...props}
    />
  );
}
