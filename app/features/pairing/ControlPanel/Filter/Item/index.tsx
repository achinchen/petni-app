import type { Category, Label, Options } from './type';
import { useControlContext } from '~/features/pairing/ControlPanel/context';
import Icon from '~/components/common/Icon';
import OptionButton from './OptionButton';
import { BUTTON_SIZE } from './constants';

type Props = {
  category: Category;
  label: Label;
  options: Options;
};

type Value = Options[number]['VALUE'];

const SMALL_BUTTON_CATEGORIES = ['size', 'color'];

export default function Filter({ category, label, options }: Props) {
  const { filter, dispatchFilter } = useControlContext();
  const currentFilter = filter[category];

  const buttonSize = SMALL_BUTTON_CATEGORIES.includes(category)
    ? BUTTON_SIZE.Sm
    : BUTTON_SIZE.Base;

  const style = { width: buttonSize === BUTTON_SIZE.Sm ? '100%' : 'initial' };
  const isSizeCategory = category === 'size';

  const getIsPressed = (value: Value) => currentFilter === value;

  const onClick = (value: Value) => () =>
    dispatchFilter({ type: category, value });

  return (
    <div mb="8 lg:4" style={style}>
      <div font="medium">{label}</div>
      <div
        mt="1"
        grid="~ cols-3 gap-2"
        justify="between"
        {...(isSizeCategory && { grid: '~ cols-4 gap-2' })}
      >
        {options.map(({ VALUE, LABEL }) => {
          const isPressed = getIsPressed(VALUE);
          return (
            <OptionButton
              key={`${category}-${VALUE}`}
              onClick={onClick(VALUE)}
              isPressed={isPressed}
              size={buttonSize}
            >
              {typeof LABEL === 'function' ? <Icon {...LABEL()} /> : LABEL}
            </OptionButton>
          );
        })}
      </div>
    </div>
  );
}
