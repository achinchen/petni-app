import { HeaderPortal } from '~/components/layout/header';
import { CHARACTER_IMAGE } from './constants';
import { ThemeColorContextProvider, useThemeColorContext } from './context';
import SearchBar from './search-bar';
import ControlButton from './control-button';
import FamilySwitcher from './family-switcher';

function ThemeColor() {
  const { family, currentInfo } = useThemeColorContext();
  const characterImg = CHARACTER_IMAGE[family];

  return (
    <main
      position="relative"
      flex="~ col lg:row-reverse"
      justify="between"
      items="center lg:start"
      mx="4 md:auto"
      px="at-lg:24"
      w="lg:90%"
      max-w="md:168 lg:262"
    >
      <HeaderPortal>
        <FamilySwitcher m="auto" />
      </HeaderPortal>
      <FamilySwitcher
        display="none md:inline-flex"
        position="absolute"
        top="10"
        right="0"
      />
      <img
        position="absolute"
        display="none lg:block"
        w="81"
        top="22.5"
        left="50%"
        translate-x="-50%"
        z="-1"
        src={characterImg}
        alt={family as string}
      />
      <section w="100%" display="flex" justify="between lg:end" items="center">
        <ControlButton
          position="none lg:absolute"
          bottom="lg:0"
          right="lg:16"
        />
        <img
          w="62.5% sm:120 lg:128.5"
          min-w="62.5"
          max-w="at-sm:120"
          src={currentInfo.IMAGE}
          alt={currentInfo.LABEL}
        />
        <ControlButton
          isNext
          position="none lg:absolute"
          bottom="lg:0"
          right="0"
        />
      </section>
      <section flex="~ lg:none col" mt="lg:40" max-w="lg:75">
        <h1 m="0" text="xl lg:7xl leading-normal">
          {currentInfo.LABEL}
        </h1>
        <p mt="2 lg:8" mb="9 lg:14" text="lg gray-450">
          {currentInfo.CHARACTERISTIC}
        </p>
        <SearchBar
          self="center lg:start"
          search={currentInfo.KEY}
          label={currentInfo.LABEL}
        />
      </section>
    </main>
  );
}

export default function ThemeColorWithProvider() {
  return (
    <ThemeColorContextProvider>
      <ThemeColor />
    </ThemeColorContextProvider>
  );
}
