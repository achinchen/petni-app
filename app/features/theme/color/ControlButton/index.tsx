import type { AttributifyOptions } from '@unocss/preset-attributify';
import { useThemeColorContext } from '~/features/theme/color/context';
import Icon, { ChevronLeft, ChevronRight } from '~/components/common/Icon';

const LABEL = {
  next: 'go next',
  previous: 'go previous'
};

type Props = {
  isNext?: boolean;
} & AttributifyOptions;

export default function ControlButton({
  isNext,
  ...attributifyOptions
}: Props) {
  const icon = isNext ? ChevronRight : ChevronLeft;
  const label = LABEL[isNext ? 'next' : 'previous'];
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
      <Icon size="md" label={label} icon={icon} w="5" />
    </button>
  );
}
