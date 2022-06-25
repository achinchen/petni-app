import type { AttributifyOptions } from '@unocss/preset-attributify';

type Props = React.HTMLAttributes<HTMLTextAreaElement> & AttributifyOptions;

export default function Textarea(props: Props) {
  return (
    <textarea
      d="block"
      w="100%"
      mt="2"
      p="3"
      bg="gray-50"
      border="none rounded-lg"
      text="sm"
      resize="none"
      {...props}
    />
  );
}
