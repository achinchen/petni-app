import { useEffect } from 'react';
import { Area } from '~/features/hospital/constants';
import { useHospitalContext } from '~/features/hospital/context';

export function useIntersectionObserver() {
  const { area, setArea } = useHospitalContext();
  useEffect(() => {
    const observers = [...document.querySelectorAll('div[data-area-hash]')].map(
      (dom) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const id = entry.target.getAttribute('id');
              if (entry.intersectionRatio > 0 && id !== area) {
                setArea(id as Area);
              }
            });
          },
          { threshold: 1 }
        );
        observer.observe(dom);
        return observer;
      }
    );

    return () => observers.forEach((observer) => observer.disconnect());
  });
}
