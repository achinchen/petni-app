import type { IconType } from '~/components/common/Icon';
import IconButton from '~/components/common/IconButton';
import { ICONS } from '~/components/common/Icon';
import Button from '~/components/common/Button';

type Props = {
  isPressed: boolean;
  label: IconType | string;
  onClick: () => void;
  shape?: 'square' | 'rectangle';
};

const isIcon = (x: any): x is IconType => Object.keys(ICONS).includes(x);

export default function OptionButton({
  isPressed,
  label,
  onClick,
  shape = 'square'
}: Props) {
  const bg = isPressed ? 'black' : 'gray-50';

  if (isIcon(label))
    return (
      <IconButton
        icon={label}
        onClick={onClick}
        h="13 md:15"
        w="13 md:15"
        bg={bg}
        border="rounded-xl"
        transition="150"
      />
    );

  if (shape === 'square')
    return (
      <Button
        onClick={onClick}
        h="13 md:15"
        w="13 md:15"
        bg={bg}
        border="rounded-xl"
        shadow="none"
        transition="150"
      >
        {label}
      </Button>
    );

  return (
    <Button
      onClick={onClick}
      h="10"
      bg={bg}
      border="rounded-xl"
      shadow="none"
      transition="150"
    >
      {label}
    </Button>
  );
}
