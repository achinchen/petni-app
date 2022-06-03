import type { AttributifyOptions } from '@unocss/preset-attributify';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { HEADER_PORTAL_ID } from './constants';

type Props = {
  children: JSX.Element;
} & AttributifyOptions;

export function HeaderPortal({ children, ...attributifyOptions }: Props) {
  const ref = useRef<HTMLElement>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dom = document.getElementById(HEADER_PORTAL_ID);
    if (dom) {
      ref.current = dom;
      if (attributifyOptions)
        Object.entries(attributifyOptions).forEach(([key, value]) => {
          dom.setAttribute(key, value);
        });
    }
  }, [attributifyOptions]);

  if (mounted && ref.current) return createPortal(children, ref.current);
  return null;
}

export default function Header() {
  return (
    <header
      id={HEADER_PORTAL_ID}
      position="sticky"
      top="0"
      display="flex lg:none"
      h="16 sm:23"
      px="2 sm:4"
      py="1 sm:4"
      bg="white"
      shadow="header"
      z="10"
    />
  );
}
