'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { scrollToTarget } from '@/lib/lenisStore';

// Link whose text is cloned below it; on hover both slide up 100% (0.5s ease) revealing the accent-coloured clone.
// "/#section" links smooth-scroll when already on the home page.
export default function LinkBlock({ href, label, external = false }) {
  const a = useRef(null), b = useRef(null), path = usePathname();
  const set = (y) => { a.current.style.transform = b.current.style.transform = `translateY(${y})`; };
  const onClick = (e) => { if (path === '/' && href.startsWith('/#')) { e.preventDefault(); scrollToTarget(href.slice(1)); } };
  const isExt = /^(https?:|mailto:|tel:)/.test(href);
  const inner = (<>
    <span ref={a} className="link has--color-white">{label}</span>
    <span ref={b} className="link link-clone" aria-hidden="true">{label}</span>
  </>);
  const common = { className: 'link-block', 'data-cursor': 'click', onMouseEnter: () => set('-100%'), onMouseLeave: () => set('0') };
  return isExt
    ? <a href={href} {...common} {...(external && /^https?:/.test(href) ? { target: '_blank', rel: 'noopener me' } : {})}>{inner}</a>
    : <Link href={href} onClick={onClick} {...common}>{inner}</Link>;
}
