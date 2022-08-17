import type { MouseEvent } from 'react';
import { useState } from 'react';

type Props = {
  show: boolean;
  placeholder: string;
  options: string[];
  onChange: (option: string) => void;
};

export default function Select({
  show,
  placeholder,
  options,
  onChange
}: Props) {
  const [selectedOption, setSelectedOption] = useState('');

  const onClick = (event: MouseEvent<HTMLLIElement>) => {
    const option = (event.target as HTMLLIElement).textContent;
    if (!option) return;
    onChange(option);
    setSelectedOption(option);
  };

  return (
    <ul
      role="listbox"
      position="absolute"
      bottom="0"
      left="0"
      transform="~ translate-y-100%"
      py="2"
      px="0"
      m="0"
      z="1"
      text="center sm"
      border="1 rounded-md"
      bg="white"
      w="100%"
      max-h="100"
      overflow-y="scroll"
      list="none"
      transition="~ duration-500"
      style={{ visibility: show ? 'visible' : 'hidden' }}
    >
      <li role="option" aria-selected="false" disabled p="2" text="black">
        {placeholder}
      </li>
      {options.map((option) => (
        <li
          role="option"
          aria-selected={selectedOption === option}
          p="2"
          hover:bg="hover:gray-50"
          cursor="pointer"
          key={option}
          onClick={onClick}
        >
          {option}
        </li>
      ))}
    </ul>
  );
}
