import type { Category, Label, Options } from './type';
import Icon from '~/components/common/Icon';
import OptionButton from './OptionButton';
import { BUTTON_SIZE } from './constants';

type Props = {
  category: Category;
  label: Label;
  options: Options;
  getIsPressed: (value: any) => boolean;
  onClick: (value: any) => () => void;
};

const SMALL_BUTTON_CATEGORIES = ['size', 'color'];

export default function Filter({
  category,
  label,
  options,
  getIsPressed,
  onClick
}: Props) {
  const buttonSize = SMALL_BUTTON_CATEGORIES.includes(category)
    ? BUTTON_SIZE.Sm
    : BUTTON_SIZE.Base;

  const style = { width: buttonSize === BUTTON_SIZE.Sm ? '100%' : 'initial' };
  const isSizeCategory = category === 'size';

  return (
    <div mb="8 lg:2" style={style}>
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
