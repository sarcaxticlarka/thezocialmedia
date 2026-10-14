'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import { fontsReady } from '@/lib/fonts';

// Mobile only: the two hero taglines alternate. Chars drop in from above (0.2s power1.out, stagger .02),
// hold 1.2s, exit downward, then the second line. Paused while the hero is off screen.
export default function HeroLoop() {
  useEffect(() => {
    if (innerWidth > 767 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const first = document.querySelector('.paragraph-medium.first'), second = document.querySelector('.paragraph-medium.second');
    if (!first || !second) return;
    let splits = [], tl, io;
    fontsReady().then(() => {
      splits = [new SplitType(first, { types: 'lines, words, chars', tagName: 'span' }), new SplitType(second, { types: 'lines, words, chars', tagName: 'span' })];
      [first, second].forEach((e) => { e.style.position = 'absolute'; e.style.left = 0; e.style.right = 0; e.style.overflow = 'hidden'; });
      first.parentElement.style.minHeight = '14vw';
      const c1 = first.querySelectorAll('.char'), c2 = second.querySelectorAll('.char');
      gsap.set(c2, { opacity: 0 });
      tl = gsap.timeline({ repeat: -1, repeatDelay: 0.1, paused: true });
      tl.from(c1, { y: '-100%', opacity: 0, duration: 0.2, ease: 'power1.out', stagger: 0.02 })
        .to(c1, { y: '100%', opacity: 0, duration: 0.2, ease: 'power1.in', stagger: 0.02, delay: 1.2 })
        .fromTo(c2, { y: '-100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.2, ease: 'power1.out', stagger: 0.02 })
        .to(c2, { y: '100%', opacity: 0, duration: 0.2, ease: 'power1.in', stagger: 0.02, delay: 1.2 })
        .set(c1, { y: '0%', opacity: 1 });
      io = new IntersectionObserver((en) => en.forEach((e) => (e.isIntersecting ? tl.play() : tl.pause())));
      io.observe(first);
    });
    return () => { io?.disconnect(); tl?.kill(); splits.forEach((s) => s.revert()); };
  }, []);
  return null;
}
