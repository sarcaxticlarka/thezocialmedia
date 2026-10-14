'use client';
import { useEffect } from 'react';

// Pages without the preloader still need to start the entrance sequence (nav tiles, hero words).
export default function PageIntro() {
  useEffect(() => {
    const t = setTimeout(() => { window.__zocialIntro = true; window.dispatchEvent(new Event('zocial:intro')); }, 250);
    return () => clearTimeout(t);
  }, []);
  return null;
}
