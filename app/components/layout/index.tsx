import { Fragment } from 'react';
import { NavigationDesktop, NavigationBottom } from '~/components/navigation';
import HeaderMobile from './header';

type Props = {
  children: JSX.Element;
  statusChildren: JSX.Element;
};

export default function Layout({ children }: Props) {
  return (
    <Fragment>
      <NavigationDesktop />
      <HeaderMobile />
      {children}
      <NavigationBottom />
    </Fragment>
  );
}
