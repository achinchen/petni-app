import type { AttributifyOptions } from '@unocss/preset-attributify';
import { ICONS } from './constants';

export type IconType = keyof typeof ICONS;

type Props = {
  icon: IconType;
} & AttributifyOptions;

export default function Icon({ icon, ...attributifyOptions }: Props) {
  const src = ICONS[icon];
  return <img src={src} alt={src} w="6" {...attributifyOptions} />;
}

export { ICONS };
