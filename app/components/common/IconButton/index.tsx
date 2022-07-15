import type { MouseEvent } from 'react';
import type { AttributifyOptions } from '@unocss/preset-attributify';
import type { IconType } from '~/components/common/Icon';
import { Link } from '@remix-run/react';
import Icon from '~/components/common/Icon';

type Props = {
  icon: IconType;
  iconAttributifyOptions?: AttributifyOptions;
  to?: string;
  onClick?: () => void;
} & AttributifyOptions;

export default function IconButton({
  icon,
  onClick,
  iconAttributifyOptions,
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
        <Icon icon={icon} {...iconAttributifyOptions} />
      </Link>
    );

  return (
    <button bg="white" {...attributifyOptions} onClick={click}>
      <Icon icon={icon} {...iconAttributifyOptions} />
    </button>
  );
}
