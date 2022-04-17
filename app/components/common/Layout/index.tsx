import { Fragment } from 'react';
import {
  NavigationDesktop,
  NavigationMobile
} from '~/components/common/Layout/Navigation';
import HeaderMobile from './Header';
import BackgroundSounds from '~/components/common/Layout/BackgroundSounds';

type Props = {
  children: JSX.Element;
  withMobileHeader?: boolean;
};

export default function Layout({ children, withMobileHeader = true }: Props) {
  return (
    <Fragment>
      <NavigationDesktop />
      {withMobileHeader && <HeaderMobile />}
      {children}
      <NavigationMobile />
      <BackgroundSounds />
    </Fragment>
  );
}
