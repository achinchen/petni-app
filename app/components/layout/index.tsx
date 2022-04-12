import { Fragment } from 'react';
import { NavigationDesktop, NavigationBottom } from '~/components/Navigation';
import HeaderMobile from './header';
import BackgroundSounds from '~/components/BackgroundSounds';

type Props = {
  children: JSX.Element;
};

export default function Layout({ children }: Props) {
  return (
    <Fragment>
      <NavigationDesktop />
      <HeaderMobile />
      {children}
      <NavigationBottom />
      <BackgroundSounds />
    </Fragment>
  );
}
