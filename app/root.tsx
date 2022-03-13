import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from 'remix';
import type { MetaFunction } from 'remix';
import { styles } from '~/styles';

export function links() {
  return [...styles];
}

export const meta: MetaFunction = () => {
  return { title: 'New Remix App' };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
        font="sans"
        m="auto"
        min-h="screen"
        max-w="1280"
        bg="gray-50"
        text="black"
      >
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
