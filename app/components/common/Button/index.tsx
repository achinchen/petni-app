import type { AttributifyOptions } from '@unocss/preset-attributify';

type Props = {
  onClick: () => void;
  children: JSX.Element | string;
  isPressed?: boolean;
  isDark?: boolean;
} & AttributifyOptions;

export default function Button({
  onClick,
  children,
  isDark = false,
  isPressed = false,
  ...attributifyOptions
}: Props) {
  return (
    <button
      d="block"
      bg="white"
      {...(isDark && {
        bg: 'black',
        color: 'white'
      })}
      {...(isPressed && {
        bg: isDark ? 'white' : 'black',
        color: isDark ? 'black' : 'white'
      })}
      shadow="default"
      onClick={onClick}
      {...attributifyOptions}
    >
      {children}
    </button>
  );
}
