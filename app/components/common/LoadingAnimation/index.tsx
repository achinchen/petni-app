import { useEffect } from 'react';
import type { LottiePlayer } from '@lottiefiles/lottie-player';
import source from './loading.json';

let isRequired = false;

export default function LoadingAnimation() {
  useEffect(() => {
    if (!isRequired) require('@lottiefiles/lottie-player');
    isRequired = true;
    const player = document.querySelector('lottie-player') as LottiePlayer;
    player.addEventListener('rendered', () => player.load(source));
  }, []);

  return <lottie-player w="40" h="40" mx="auto" autoplay loop />;
}
