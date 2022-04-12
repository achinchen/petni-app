import type { IsActive } from '~/components/common/Layout/Navigation/Links/types';

type LabelProps = {
  hovered: boolean;
  isActive: IsActive;
  children: string;
};

export default function Label({ hovered, isActive, children }: LabelProps) {
  const show = hovered || isActive;

  if (!show) return null;

  return (
    <span
      color="status-general"
      {...(isActive && { color: 'status-active' })}
      text="size-4.5"
    >
      {children}
    </span>
  );
}
