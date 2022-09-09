import type { AttributifyOptions } from '@unocss/preset-attributify';
export * from './constants';

const SIZE_SCALE = {
  sm: '0.67',
  md: '1',
  lg: '1.25',
  xl: '1.5'
};

export type Size = 'sm' | 'md' | 'lg' | 'xl';

type Props = {
  icon: string;
  label?: string;
  size?: Size;
} & AttributifyOptions;

export default function SvgIcon({
  icon,
  label,
  size = 'sm',
  ...attributifyOptions
}: Props) {
  const scale = SIZE_SCALE[size];

  return (
    <svg
      role="img"
      aria-label={label}
      w="9"
      h="9"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform="~"
      style={{ '--un-transform': `scale(${scale})` }}
      {...attributifyOptions}
    >
      <path fill="currentColor" d={icon} />
    </svg>
  );
}
