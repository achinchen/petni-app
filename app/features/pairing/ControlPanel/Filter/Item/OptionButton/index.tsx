import Button from '~/components/common/Button';

type Props = {
  isPressed: boolean;
  onClick: () => void;
  children: JSX.Element | string;
  size?: 'base' | 'sm';
};

export default function OptionButton({
  isPressed,
  onClick,
  children,
  size = 'base'
}: Props) {
  return (
    <Button
      onClick={onClick}
      isPressed={isPressed}
      w="22"
      h="22 md:17"
      border="rounded-3xl md:rounded-xl"
      transition="150"
      {...(size === 'sm' && { h: 10, w: '100% lg:22', border: 'rounded-xl' })}
    >
      {children}
    </Button>
  );
}
