import { SOUND } from '~/components/common/Layout/BackgroundSound/constants';
import { useEffect, useRef } from 'react';
import { getShouldPlaySound } from './utils';

export const DEFAULT_VOLUME = 0.25;

export type SoundType = keyof typeof SOUND;
type Refs = {
  [key in SoundType]: HTMLAudioElement;
};

export default function useSound() {
  const refs = useRef<Refs>();

  const onPlay = (type: SoundType) => {
    if (!getShouldPlaySound()) return;
    const audioDom = refs.current?.[type];
    if (!audioDom) return;
    const promise = audioDom.play();
    if (!promise) return;
    promise.catch();
  };

  useEffect(() => {
    refs.current = Object.keys(SOUND).reduce((collection, type) => {
      const soundDom = document.getElementById(
        `${type}-sound`
      ) as HTMLAudioElement;
      soundDom.volume = DEFAULT_VOLUME;

      return {
        ...collection,
        [type]: soundDom
      };
    }, {}) as Refs;
  }, []);

  return { onPlay };
}
