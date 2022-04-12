import { AttributifyOptions } from '@unocss/preset-attributify';
import { useThemeColorContext } from '~/features/theme/color/context';
import Icon from '~/components/common/Icon';

type Props = {
  isNext?: boolean;
} & AttributifyOptions;

export default function ControlButton({
  isNext,
  ...attributifyOptions
}: Props) {
  const icon = isNext ? 'ArrowRight' : 'ArrowLeft';
  const { setIndex, familyInformation } = useThemeColorContext();
  const { length } = familyInformation;

  const onClickPrevious = () => {
    setIndex((currentIndex) => {
      const newIndex = currentIndex - 1;
      return newIndex > -1 ? newIndex : length - 1;
    });
  };

  const onClickNext = () => {
    setIndex((currentIndex) => (currentIndex + 1) % length);
  };

  const onClick = () => (isNext ? onClickNext() : onClickPrevious());

  return (
    <button
      display="flex"
      items="center"
      justify="center"
      w="10"
      h="10"
      border="rounded-2xl none"
      shadow="default"
      bg="white"
      appearance="none"
      cursor="pointer"
      {...attributifyOptions}
      onClick={onClick}
    >
      <Icon icon={icon} w="5" />
    </button>
  );
}
