import { Fragment } from 'react';
import {
  NavigationDesktop,
  NavigationMobile
} from '~/components/common/Layout/Navigation';
import HeaderMobile from './Header';
import BackgroundSounds from '~/components/common/Layout/BackgroundSounds';

type Props = {
  children: JSX.Element;
};

export default function Layout({ children }: Props) {
  return (
    <Fragment>
      <NavigationDesktop />
      <HeaderMobile />
      {children}
      <NavigationMobile />
      <BackgroundSounds />
    </Fragment>
  );
}
