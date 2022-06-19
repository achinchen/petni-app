import type { IconType } from '~/components/common/Icon';
import IconButton from '~/components/common/IconButton';

type Props = {
  isPressed: boolean;
  icon: IconType;
  onClick: () => void;
};

export default function OptionButton({ isPressed, icon, onClick }: Props) {
  return (
    <IconButton
      icon={icon}
      onClick={onClick}
      h="15"
      w="15"
      bg={isPressed ? 'black' : 'gray-50'}
      border="rounded-xl"
      transition="150"
    />
  );
}
