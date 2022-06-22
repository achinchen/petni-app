import type { IconType } from '~/components/common/Icon';
import IconButton from '~/components/common/IconButton';
import { ICONS } from '~/components/common/Icon';
import Button from '~/components/common/Button';

type Props = {
  isPressed: boolean;
  icon: IconType | string;
  onClick: () => void;
};

const isIcon = (x: any): x is IconType => Object.keys(ICONS).includes(x);

export default function OptionButton({ isPressed, icon, onClick }: Props) {
  return isIcon(icon) ? (
    <IconButton
      icon={icon}
      onClick={onClick}
      h="15"
      w="15"
      bg={isPressed ? 'black' : 'gray-50'}
      border="rounded-xl"
      transition="150"
    />
  ) : (
    <Button
      onClick={onClick}
      h="15"
      w="15"
      bg={isPressed ? 'black' : 'gray-50'}
      border="rounded-xl"
      shadow="none"
      transition="150"
    >
      {icon}
    </Button>
  );
}
