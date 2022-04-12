import { AttributifyOptions } from '@unocss/preset-attributify';
import Icon, { IconType } from '~/components/Icon';

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
