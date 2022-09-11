import type { Props as IconProps } from '~/components/common/Icon';
import IconButton from '~/components/common/IconButton';
import Button from '~/components/common/Button';

type Props = {
  isPressed: boolean;
  label: string;
  icon?: string;
  color?: string;
  onClick: () => void;
  shape?: 'square' | 'rectangle';
};

export default function OptionButton({
  isPressed,
  onClick,
  shape = 'square',
  icon,
  label,
  color
}: Props) {
  const bg = isPressed ? 'black' : 'gray-50';
  const stateColor = isPressed ? 'white' : 'black';

  if (icon)
    return (
      <IconButton
        onClick={onClick}
        h="13 md:15"
        w="13 md:15"
        bg={bg}
        border="rounded-xl"
        transition="150"
        icon={icon}
        iconOptions={{ color: color || stateColor }}
        label={label}
      />
    );

  if (shape === 'square')
    return (
      <Button
        onClick={onClick}
        h="13 md:15"
        w="13 md:15"
        bg={bg}
        color={stateColor}
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
      color={stateColor}
      border="rounded-xl"
      shadow="none"
      transition="150"
    >
      {label}
    </Button>
  );
}
