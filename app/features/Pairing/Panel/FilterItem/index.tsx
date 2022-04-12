import type { Category, Label, Options } from './type';
import Icon from '~/components/common/Icon';
import OptionButton from '~/features/Pairing/Panel/FilterItemOptionButton';

type Props = {
  category: Category;
  label: Label;
  options: Options;
  getIsPressed: (value: any) => boolean;
  onClick: (value: any) => () => void;
};

export default function PanelFilterItem({
  category,
  label,
  options,
  getIsPressed,
  onClick
}: Props) {
  const buttonSize = ['age', 'color'].includes(category) ? 'sm' : 'base';

  return (
    <div mb="8" style={{ width: buttonSize === 'sm' ? '100%' : 'initial' }}>
      <div font="medium">{label}</div>
      <div mt="1" grid="~ cols-3 gap-3" justify="between">
        {options.map(({ VALUE, LABEL }) => {
          const isPressed = getIsPressed(VALUE);
          return (
            <OptionButton
              key={`${category}-${VALUE}`}
              onClick={onClick(VALUE)}
              isPressed={isPressed}
              size={buttonSize}
            >
              {typeof LABEL === 'function' ? (
                <Icon icon={LABEL(isPressed)} />
              ) : (
                LABEL
              )}
            </OptionButton>
          );
        })}
      </div>
    </div>
  );
}
