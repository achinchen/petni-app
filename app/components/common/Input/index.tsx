import type { ChangeEvent } from 'react';
import type { AttributifyOptions } from '@unocss/preset-attributify';

type Props = {
  onValueChange?: (value: string) => void;
} & React.HTMLAttributes<HTMLInputElement> &
  AttributifyOptions;

export default function Input({ onValueChange, ...props }: Props) {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(event.target.value);
  };

  return (
    <input
      d="block"
      w="100%"
      mt="2"
      p="3"
      bg="gray-50"
      border="none rounded-lg"
      text="sm"
      onChange={onChange}
      {...props}
    />
  );
}
