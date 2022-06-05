import type { AttributifyOptions } from '@unocss/preset-attributify';
import type { IconType } from '~/components/common/Icon';
import Icon from '~/components/common/Icon';

type Props = {
  icon: IconType;
  iconAttributifyOptions: AttributifyOptions;
  onClick: () => void;
} & AttributifyOptions;

export default function IconButton({
  icon,
  onClick,
  iconAttributifyOptions,
  ...attributifyOptions
}: Props) {
  return (
    <button bg="white" {...attributifyOptions} onClick={onClick}>
      <Icon icon={icon} {...iconAttributifyOptions} />
    </button>
  );
}
