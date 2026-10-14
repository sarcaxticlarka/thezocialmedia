'use client';
import { scrollToTarget } from '@/lib/lenisStore';

export default function TopButton() {
  return (
    <button className="top-block" aria-label="Back to top" data-cursor="click" onClick={() => scrollToTarget(0)}>
      <svg className="arrow-up" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 22V4M5 11l7-7 7 7" stroke="#ececec" strokeWidth="2.4" strokeLinecap="square" /></svg>
    </button>
  );
}
