import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { HEADER_PORTAL_ID } from './constants';

export function HeaderPortal({ children }: { children: JSX.Element }) {
  const ref = useRef<HTMLElement>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dom = document.getElementById(HEADER_PORTAL_ID);
    if (dom) ref.current = dom;
  }, []);

  if (mounted && ref.current) return createPortal(children, ref.current);
  return null;
}

export default function Header() {
  return (
    <header
      id={HEADER_PORTAL_ID}
      display="flex md:none"
      h="23"
      p="4"
      bg="white"
      shadow="header"
    />
  );
}
