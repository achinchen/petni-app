import { Fragment } from 'react';
import {
  NavigationDesktop,
  NavigationMobile
} from '~/components/common/Layout/Navigation';
import HeaderMobile from './Header';
import BackgroundSound from '~/components/common/Layout/BackgroundSound';

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
      <BackgroundSound />
    </Fragment>
  );
}
