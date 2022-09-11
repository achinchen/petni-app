import Icon from '~/components/common/Icon';

type Props = {
  icon: string;
  color: string;
  label: string;
};

export default function LabelIcon({ icon, color, label }: Props) {
  return (
    <div text="center">
      <div p="3 md:5" bg="gray-50" mb="1" border="rounded-1/2">
        <Icon size="md" icon={icon} color={color} />
      </div>
      {label}
    </div>
  );
}
