'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import PaperTransition from '@/lib/paperTransition';
import { ensureLenis } from '@/lib/lenisStore';

const Icon = () => (
  <svg className="marquee-icon" viewBox="0 0 60 60" fill="none" aria-hidden="true">
    <path d="M8 8l44 44M52 8L8 52" stroke="#ececec" strokeWidth="9" strokeLinecap="square" opacity=".9" />
  </svg>
);
const Part = () => (
  <div className="marquee-part_team">
    <p data-animate="" className="heading-large">hello zocial</p><Icon />
    <p data-animate="" className="heading-large">hello zocial</p><Icon />
  </div>
);

export default function Preloader() {
  const root = useRef(null);
  const canvas = useRef(null);
  const wrap = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    const el = root.current;
    const finish = () => { window.__zocialIntro = true; window.dispatchEvent(new Event('zocial:intro')); };
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try { seen = !!sessionStorage.getItem('animationPlayed'); } catch {}

    // Returning visitor (or reduced motion): skip, start the hero after a beat (original waits 1s on desktop)
    if (seen || reduce) {
      el.remove();
      setTimeout(finish, reduce ? 0 : innerWidth >= 768 ? 1000 : 0);
      return;
    }

    let pt, cancelled = false, split;
    const lenis = () => ensureLenis();
    const block = (e) => e.preventDefault();
    const keys = (e) => { if ([37, 38, 39, 40, 32].includes(e.keyCode)) e.preventDefault(); };
    window.addEventListener('wheel', block, { passive: false });
    window.addEventListener('touchmove', block, { passive: false });
    window.addEventListener('keydown', keys, { passive: false });
    lenis()?.stop();

    try { pt = new PaperTransition(canvas.current, { color: '#e3262e', duration: 1.2 }); pt.set(1); } catch { canvas.current.style.display = 'none'; el.style.background = '#e3262e'; }

    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      await wait(1500);
      if (cancelled) return;
      wrap.current.style.visibility = 'visible';
      track.current.classList.add('run');
      split = new SplitType(el.querySelectorAll('[data-animate]'), { types: 'lines, words, chars', tagName: 'span' });
      const elements = gsap.utils.toArray(el.querySelectorAll('[data-animate]'));

      // intro: chars rise, icons spin in
      const intro = gsap.timeline();
      elements.forEach((e) => intro.from(e.querySelectorAll('.char'), { y: '100%', opacity: 0.5, duration: 0.5, ease: 'circ.inOut', stagger: 0.1 }, 0));
      intro.fromTo('.marquee-icon', { scale: 0, opacity: 0, rotate: -45 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.6, ease: 'circ.inOut' }, '<+=0.5');
      await intro.then();
      await wait(2000);
      if (cancelled) return;

      // outro: chars lift out, icons spin away
      const outro = gsap.timeline();
      elements.forEach((e) => outro.to(e.querySelectorAll('.char'), { y: '-100%', opacity: 0, duration: 0.55, ease: 'circ.inOut', stagger: 0.1 }, 0));
      outro.to('.marquee-icon', { scale: 0, opacity: 0, rotate: 45, delay: 0.8, duration: 0.6, ease: 'circ.inOut' }, 0);
      await outro.then();
      await wait(200);
      if (cancelled) return;

      // rip the paper away, wake the page
      window.removeEventListener('wheel', block);
      window.removeEventListener('touchmove', block);
      window.removeEventListener('keydown', keys);
      lenis()?.start();
      finish();
      if (pt) await pt.out(1.2); else await gsap.to(el, { yPercent: -100, duration: 1.2, ease: 'sine.inOut' }).then();
      try { sessionStorage.setItem('animationPlayed', 'true'); } catch {}
      setTimeout(() => el.remove(), 200);
    })();

    return () => {
      cancelled = true;
      window.removeEventListener('wheel', block);
      window.removeEventListener('touchmove', block);
      window.removeEventListener('keydown', keys);
      split?.revert();
      pt?.destroy();
    };
  }, []);

  return (
    <div ref={root} id="preloader" className="preloader" aria-hidden="true">
      <div ref={wrap} className="marquee-wrapper_preloader">
        <div ref={track} className="marquee-block_preloader">
          <Part /><Part />
        </div>
      </div>
      <div className="paper-wrapper"><canvas ref={canvas} id="paper-div" className="paper-div" /></div>
    </div>
  );
}
