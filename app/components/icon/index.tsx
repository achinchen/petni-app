import { AttributifyOptions } from '@unocss/preset-attributify';
import { SOURCE } from './constants';

export type IconType = keyof typeof SOURCE;

type Props = {
  icon: IconType;
} & AttributifyOptions;

export default function Icon({ icon, ...attributifyOptions }: Props) {
  const src = SOURCE[icon];
  return <img src={src} alt={src} w="9" {...attributifyOptions} />;
}
