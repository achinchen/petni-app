import { useRef, useEffect, useLayoutEffect, useCallback } from 'react';

type Parameters = {
  dom: HTMLElement;
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

  useLayoutEffect(() => {
    pointer.current = {
      touchstartX: 0,
      touchendX: 0
    };
  }, []);

  useEffect(() => {
    const onTouchStart = (event: TouchEvent) => {
      pointer.current.touchstartX = event.changedTouches[0].screenX;
    };

    const onTouchEnd = (event: TouchEvent) => {
      pointer.current.touchendX = event.changedTouches[0].screenX;
      onTouch();
    };

    dom.addEventListener('touchstart', onTouchStart);

    dom.addEventListener('touchend', onTouchEnd);

    return () => {
      dom.removeEventListener('touchstart', onTouchStart);
      dom.removeEventListener('touchend', onTouchEnd);
    };
  }, [dom, onTouch]);
}
