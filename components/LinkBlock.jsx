'use client';
import { useRef } from 'react';
import { scrollToTarget } from '@/lib/lenisStore';

// Link whose text is cloned below it; on hover both slide up 100% (0.5s ease) revealing the accent-coloured clone.
export default function LinkBlock({ href, label, external = false }) {
  const a = useRef(null), b = useRef(null);
  const set = (y) => { a.current.style.transform = b.current.style.transform = `translateY(${y})`; };
  const onClick = (e) => { if (href.startsWith('#')) { e.preventDefault(); scrollToTarget(href); } };
  const ext = external && /^https?:/.test(href) ? { target: '_blank', rel: 'noopener me' } : {};
  return (
    <a href={href} className="link-block" data-cursor="click" onClick={onClick} onMouseEnter={() => set('-100%')} onMouseLeave={() => set('0')} {...ext}>
      <span ref={a} className="link has--color-white">{label}</span>
      <span ref={b} className="link link-clone" aria-hidden="true">{label}</span>
    </a>
  );
}
