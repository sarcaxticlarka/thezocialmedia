'use client';
import { useEffect, useRef } from 'react';
import PaperTransition from '@/lib/paperTransition';

// Full-screen ripped-paper wipe (same shader as the preloader). Exposes window.zocialWipe(fn):
// wipe in (1.2s sine.inOut) -> run fn -> wipe out. Hidden whenever progress is 0.
export default function TransitionLayer() {
  const canvas = useRef(null), wrap = useRef(null);

  useEffect(() => {
    let pt;
    try { pt = new PaperTransition(canvas.current, { color: '#e3262e', duration: 1.2 }); } catch { return; }
    window.zocialWipe = async (fn) => {
      wrap.current.style.visibility = 'visible';
      await pt.in();
      await fn?.();
      await pt.out();
      wrap.current.style.visibility = 'hidden';
    };
    return () => { delete window.zocialWipe; pt.destroy(); };
  }, []);

  return (
    <div ref={wrap} id="transition-wrapper" aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 9990, pointerEvents: 'none', visibility: 'hidden' }}>
      <canvas ref={canvas} id="transition-canvas" style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}
