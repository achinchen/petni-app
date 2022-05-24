import { Link as RemixLink } from '@remix-run/react';
import Logo from '~/components/common/Logo';
import Links from './Links';

export function NavigationDesktop() {
  return (
    <nav
      display="none lg:block"
      h="20"
      px="4"
      py="3"
      bg="white"
      shadow="header"
    >
      <div flex="~" m="auto" className="content-width">
        <RemixLink to="/">
          <Logo type="horizontal" w="29.5" />
        </RemixLink>
        <Links withLabel />
      </div>
    </nav>
  );
}

export function NavigationMobile() {
  return (
    <Links
      position="fixed"
      bottom="0"
      display="flex lg:none"
      h="14"
      w="100%"
      shadow="tabs"
    />
  );
}
