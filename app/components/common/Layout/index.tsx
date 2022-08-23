import { Fragment } from 'react';
import { NavigationDesktop, NavigationMobile } from './Navigation';
import Header from './Header';
import BackgroundSound from './BackgroundSound';

type Props = {
  children: JSX.Element;
  withHeader?: boolean;
};

export default function Layout({ children, withHeader = true }: Props) {
  return (
    <Fragment>
      <NavigationDesktop />
      {withHeader && <Header />}
      {children}
      <NavigationMobile />
      <BackgroundSound />
    </Fragment>
  );
}
