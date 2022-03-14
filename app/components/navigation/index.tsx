import Logo from '~/components/logo';
import NavigationAction from './links';

export function NavigationDesktop() {
  return (
    <nav display="none md:flex" h="20" py="3" px="20" bg="white">
      <Logo type="horizontal" w="29.5" />
      <NavigationAction withLabel />
    </nav>
  );
}

export function NavigationBottom() {
  return (
    <NavigationAction
      position="fixed"
      display="flex md:none"
      mt="100%"
      bottom="0"
      h="14"
      w="100%"
    />
  );
}
