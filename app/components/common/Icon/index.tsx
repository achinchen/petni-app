import type { AttributifyOptions } from '@unocss/preset-attributify';
import { ICONS, ALT_DICT } from './constants';

export type IconType = keyof typeof ICONS;

type Props = {
  icon: IconType;
} & AttributifyOptions;

export default function Icon({ icon, ...attributifyOptions }: Props) {
  const src = ICONS[icon];
  const alt = ALT_DICT[icon] || icon;

  return <img src={src} alt={alt} w="6" {...attributifyOptions} />;
}

export { ICONS };
