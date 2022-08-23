type Props = {
  checked: boolean;
  onChange: () => void;
};

export default function SwitchButton({ checked, onChange }: Props) {
  return (
    <div
      role="checkbox"
      aria-checked={checked}
      position="relative"
      display="inline-block"
      h="7"
      w="14"
      cursor="pointer"
      duration="200"
      border="rounded-3xl"
      bg="status-general"
      {...(checked && { bg: 'status-active' })}
      onClick={onChange}
    >
      <span
        position="absolute"
        top="1/2"
        left="1"
        translate-y="-1/2"
        w="5"
        h="5"
        bg="white"
        border="rounded-1/2"
        duration="250"
        {...(checked && {
          style: {
            left: '100%',
            transform: 'translate(calc(-100% - 0.25rem), -50%)'
          }
        })}
      />
    </div>
  );
}
