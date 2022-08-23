import { render, screen } from '@testing-library/react';
import { MockComponent } from 'spec/utils/getMockComponent';
import Layout from '.';

const mock = {
  children: 'children'
};

const testId = {
  navigationDesktop: 'NavigationDesktop',
  navigationMobile: 'NavigationMobile',
  header: 'Header',
  backgroundSound: 'BackgroundSound'
};

jest.mock('./Navigation', () => ({
  __esModule: true,
  NavigationMobile: MockComponent('NavigationMobile'),
  NavigationDesktop: MockComponent('NavigationDesktop')
}));

jest.mock('./Header', () => MockComponent('Header'));
jest.mock('./BackgroundSound', () => MockComponent('BackgroundSound'));

describe('rendering', () => {
  beforeEach(() => {
    render(
      <Layout>
        <div>{mock.children}</div>
      </Layout>
    );
  });

  test('render NavigationDesktop', () => {
    expect(screen.getByTestId(testId.navigationDesktop)).toBeDefined();
  });

  test('render NavigationMobile', () => {
    expect(screen.getByTestId(testId.navigationMobile)).toBeDefined();
  });

  test('render HeaderMobile', () => {
    expect(screen.getByTestId(testId.header)).toBeDefined();
  });

  test('render BackgroundSound', () => {
    expect(screen.getByTestId(testId.backgroundSound)).toBeDefined();
  });

  // test('render children', () => {
  //   expect(screen.getByText(mock.children)).toBeDefined();
  // });
});

// export default function Layout({ children, withMobileHeader = true }: Props) {
//   return (
//     <Fragment>
//       <NavigationDesktop />
//       {withMobileHeader && <HeaderMobile />}
//       {children}
//       <NavigationMobile />
//       <BackgroundSound />
//     </Fragment>
//   );
// }
