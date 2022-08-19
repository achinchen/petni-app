import { useRef, useEffect, useCallback } from 'react';

export type Parameters = {
  dom?: HTMLElement;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
};

export default function useSwipe({
  dom,
  onSwipeLeft,
  onSwipeRight
}: Parameters) {
  const pointer = useRef({
    touchstartX: 0,
    touchendX: 0
  });

  const onTouch = useCallback(() => {
    const { touchendX, touchstartX } = pointer.current;
    if (touchendX < touchstartX) return onSwipeLeft();
    if (touchendX > touchstartX) return onSwipeRight();
  }, [onSwipeRight, onSwipeLeft, pointer]);

  useEffect(() => {
    const targetDom = dom || document.body;

    const onTouchStart = (event: TouchEvent) => {
      pointer.current.touchstartX = event.changedTouches[0].screenX;
    };

    const onTouchEnd = (event: TouchEvent) => {
      pointer.current.touchendX = event.changedTouches[0].screenX;
      onTouch();
    };

    targetDom.addEventListener('touchstart', onTouchStart);

    targetDom.addEventListener('touchend', onTouchEnd);

    return () => {
      targetDom.removeEventListener('touchstart', onTouchStart);
      targetDom.removeEventListener('touchend', onTouchEnd);
    };
  }, [dom, onTouch]);
}
