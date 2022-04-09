import { AttributifyOptions } from '@unocss/preset-attributify';
import Icon, { IconType } from '~/components/icon';

type Props = {
  icon: IconType;
  iconAttributifyOptions: AttributifyOptions;
} & AttributifyOptions;

export default function IconButton({
  icon,
  iconAttributifyOptions,
  ...attributifyOptions
}: Props) {
  return (
    <button bg="white" {...attributifyOptions}>
      <Icon icon={icon} {...iconAttributifyOptions} />
    </button>
  );
}
