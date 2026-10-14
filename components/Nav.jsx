'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { NAV, SITE } from '@/lib/data';
import { scrollToTarget } from '@/lib/lenisStore';

function LinkBlock({ href, label, onClick, large, white }) {
  const link = useRef(null), clone = useRef(null);
  const set = (y) => { if (link.current && clone.current) link.current.style.transform = clone.current.style.transform = `translateY(${y})`; };
  return (
    <a href={href} data-cursor="click" className={`link-block${large ? ' is--large' : ''}`} onClick={onClick}
      onMouseEnter={() => set('-100%')} onMouseLeave={() => set('0')}>
      <span ref={link} className={`link is--nav${white ? ' has--color-white' : ''}`}>{label}</span>
      <span ref={clone} className="link link-clone is--nav" aria-hidden="true">{label}</span>
    </a>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const root = useRef(null);

  useEffect(() => {
    // After the preloader: navbar fades in (0.8s, 0.6 delay), tiles rise (translateY 100% -> 0, 0.8s ease-in-out)
    const go = () => {
      const tl = gsap.timeline();
      tl.fromTo(root.current, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.6, ease: 'power2.out' }, 0);
      tl.fromTo('.mobile-logo-block', { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.6, ease: 'power2.out' }, 0);
      tl.fromTo('.tile-rise', { yPercent: 100 }, { yPercent: 0, duration: 0.8, ease: 'power1.inOut', stagger: 0.1 }, 0.9);
    };
    gsap.set(root.current, { opacity: 0 });
    gsap.set('.tile-rise', { yPercent: 100 });
    gsap.set('.mobile-logo-block', { opacity: 0 });
    if (window.__zocialIntro) go();
    window.addEventListener('zocial:intro', go, { once: true });
    return () => window.removeEventListener('zocial:intro', go);
  }, []);

  useEffect(() => { document.documentElement.style.overflow = open ? 'hidden' : ''; }, [open]);

  const nav = (e, href) => {
    e.preventDefault();
    setOpen(false);
    scrollToTarget(href);
  };

  return (
    <>
      <header ref={root} className="navbar">
        <div className="container">
          <div className="layout is--nav">
            <a href="#top" className="logo-block" aria-label="The Zocial Media, back to top" data-cursor="click" onClick={(e) => nav(e, 0)}>
              <img src="/logo.jpg" width="150" height="150" alt="The Zocial Media logo" />
            </a>
            <nav className={`nav-menu${open ? ' open' : ''}`} aria-label="Primary">
              <div className="nav-block">
                {NAV.map((n) => <LinkBlock key={n.href} href={n.href} label={n.label} large onClick={(e) => nav(e, n.href)} />)}
              </div>
            </nav>
            <div className="button-block">
              <div className="pink-button-wrapper is--language">
                <div className="language-block tile-rise" data-cursor="click">
                  <a className="language-option" href={SITE.instagram} target="_blank" rel="noopener me">
                    <span className="link has--color-white">IG</span>
                    <span className="language-hover" />
                  </a>
                </div>
              </div>
              <div className="button-lottie-wrapper">
                <div className="pink-button-wrapper">
                  <a className="pink-button tile-rise hide_mobile" href="#form" data-cursor="click" onClick={(e) => nav(e, '#form')}>
                    <p className="button-text">Get<br />Started</p>
                    <svg className="plus-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M8 0h4v8h8v4h-8v8H8v-8H0V8h8z" fill="#ececec" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <a href="#top" className="mobile-logo-block" aria-label="The Zocial Media" onClick={(e) => nav(e, 0)}>
        <img src="/logo.jpg" width="150" height="150" alt="" />
      </a>
      <button className="menu-button" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
        {open ? 'close' : 'menu'}
      </button>
    </>
  );
}
