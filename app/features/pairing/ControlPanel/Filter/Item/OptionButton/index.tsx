import Button from '~/components/common/Button';
import { BUTTON_SIZE } from '~/features/pairing/ControlPanel/Filter/Item/constants';

type Props = {
  isPressed: boolean;
  onClick: () => void;
  children: JSX.Element | string;
  size: BUTTON_SIZE;
};

export default function OptionButton({
  isPressed,
  onClick,
  children,
  size
}: Props) {
  return (
    <Button
      onClick={onClick}
      isPressed={isPressed}
      w="22"
      h="22 md:17"
      border="rounded-3xl md:rounded-xl"
      transition="150"
      {...(size === BUTTON_SIZE.Sm && {
        h: '10',
        w: '100%',
        border: 'rounded-xl'
      })}
    >
      {children}
    </Button>
  );
}
