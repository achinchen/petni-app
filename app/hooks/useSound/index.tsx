import { useEffect, useRef } from 'react';
import { SOUNDS } from '~/components/common/Layout/BackgroundSounds/constants';
import { getShouldPlaySound } from './utils';

export type SoundType = keyof typeof SOUNDS;
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
    refs.current = Object.keys(SOUNDS).reduce((collection, type) => {
      return {
        ...collection,
        [type]: document.getElementById(`${type}-sound`) as HTMLAudioElement
      };
    }, {}) as Refs;
  }, []);

  return onPlay;
}
