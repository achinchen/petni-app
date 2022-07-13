import type { AttributifyOptions } from '@unocss/preset-attributify';

const COLOR_GRAY = 'gray-50';

type Props = {
  onClick: () => void;
  children: JSX.Element | string;
  isPressed?: boolean;
  color?: 'white' | 'black' | 'gray';
  isDark?: boolean;
} & AttributifyOptions;

export default function Button({
  onClick,
  children,
  theme = 'white',
  isPressed = false,
  disabled = false,
  ...attributifyOptions
}: Props) {
  const isDark = theme === 'black';
  const color = theme === 'gray' ? COLOR_GRAY : theme;

  return (
    <button
      d="block"
      bg={color}
      {...(isDark && {
        color: 'white'
      })}
      {...(isPressed && {
        bg: isDark ? 'white' : 'black',
        color: isDark ? 'black' : 'white'
      })}
      {...(disabled && {
        style: { filter: 'opacity(0.25)' },
        cursor: 'not-allowed'
      })}
      shadow="default"
      border="rounded-lg"
      onClick={onClick}
      disabled={disabled}
      {...attributifyOptions}
    >
      {children}
    </button>
  );
}
