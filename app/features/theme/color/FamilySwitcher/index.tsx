import type { AttributifyOptions } from '@unocss/preset-attributify';
import type { Family } from '~/constants';
import { FAMILY_LABEL } from '~/features/theme/color/constants';
import { useThemeColorContext } from '~/features/theme/color/context';

type Props = {
  isNext?: boolean;
} & AttributifyOptions;

export default function FamilySwitcher({ ...attributifyOptions }: Props) {
  const { family, setFamily, setIndex } = useThemeColorContext();
  const getIsCurrentFamily = (currentFamily: string) =>
    currentFamily === family;
  const onClick = (family: string) => () => {
    setFamily(family as Family);
    setIndex(0);
  };

  return (
    <div
      shadow="default"
      px="2"
      py="1"
      border="rounded-xl none"
      bg="white"
      text="black"
      {...attributifyOptions}
    >
      {Object.entries(FAMILY_LABEL).map(([family, label]) => (
        <button
          key={family}
          border="rounded-3xl"
          px="2.5"
          py="1 sm:0"
          mx="0.5"
          bg="white"
          color="black"
          {...(getIsCurrentFamily(family) && {
            bg: 'black',
            color: 'white'
          })}
          onClick={onClick(family)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
