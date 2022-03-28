import { AttributifyOptions } from '@unocss/preset-attributify';

type Props = {
  onClick: () => void;
  children: JSX.Element | string;
  isPressed?: boolean;
} & AttributifyOptions;

export default function Button({
  onClick,
  children,
  isPressed = false,
  ...attributifyOptions
}: Props) {
  return (
    <button
      d="block"
      bg="white"
      shadow="default"
      {...(isPressed && {
        bg: 'black',
        color: 'white'
      })}
      onClick={onClick}
      {...attributifyOptions}
    >
      {children}
    </button>
  );
}
