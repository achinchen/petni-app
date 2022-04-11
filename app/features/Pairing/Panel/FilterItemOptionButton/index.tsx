import Button from '~/components/button';

export type Props = {
  isPressed: boolean;
  onClick: () => void;
  children: JSX.Element | string;
  size?: 'base' | 'sm';
};

export default function PanelFilterItemOptionButton({
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
      h="22"
      border="rounded-3xl"
      transition="150"
      {...(size === 'sm' && { h: 10, w: '100% lg:22', border: 'rounded-xl' })}
    >
      {children}
    </Button>
  );
}
