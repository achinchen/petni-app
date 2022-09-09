import type { AttributifyOptions } from '@unocss/preset-attributify';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> extends AttributifyOptions {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface SVGAttributes<T> extends AttributifyOptions {}

  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
