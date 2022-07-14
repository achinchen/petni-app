import type { ChangeEvent } from 'react';
import type { AttributifyOptions } from '@unocss/preset-attributify';

type Props = {
  onValueChange?: (value: string) => void;
} & React.HTMLAttributes<HTMLTextAreaElement> &
  AttributifyOptions;

export default function Textarea({ onValueChange, ...props }: Props) {
  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onValueChange?.(event.target.value);
  };

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
      onChange={onChange}
      {...props}
    />
  );
}
