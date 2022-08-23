import type { AttributifyOptions } from '@unocss/preset-attributify';
import { SOURCE, APP_NAME } from './constants';

type Props = {
  type?: keyof typeof SOURCE;
} & AttributifyOptions;

export default function Logo({
  type = 'vertical',
  ...attributifyOptions
}: Props) {
  const src = SOURCE[type];

  return <img src={src} alt={`${APP_NAME} Logo`} {...attributifyOptions} />;
}
