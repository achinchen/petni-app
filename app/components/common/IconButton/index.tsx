import type { MouseEvent } from 'react';
import type { AttributifyOptions } from '@unocss/preset-attributify';
import type { Props as IconProps } from '~/components/common/Icon';
import { Link } from '@remix-run/react';
import Icon from '~/components/common/Icon';

type Props = {
  icon: string;
  label?: string;
  iconOptions?: Omit<IconProps, 'icon'>;
  to?: string;
  onClick?: () => void;
} & AttributifyOptions;

export default function IconButton({
  icon,
  label,
  iconOptions,
  onClick,
  to,
  ...attributifyOptions
}: Props) {
  const click = (event: MouseEvent) => {
    event.stopPropagation();
    onClick?.();
  };

  if (to)
    return (
      <Link to={to} bg="white" {...attributifyOptions} onClick={click}>
        <Icon icon={icon} {...iconOptions} />
      </Link>
    );

  return (
    <button
      aria-label={label}
      bg="white"
      {...attributifyOptions}
      onClick={click}
    >
      <Icon icon={icon} {...iconOptions} />
    </button>
  );
}
