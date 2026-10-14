'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { ensureLenis } from '@/lib/lenisStore';
import { fontsReady } from '@/lib/fonts';

gsap.registerPlugin(ScrollTrigger);

// Global scroll/entrance effects driven by data attributes (ported from the original's inline GSAP code):
//   data-animate-p   words slide up inside masked lines (batch at top 80%), data-delay in seconds, data-first-load
//   data-animate-large / data-animate-medium   chars fade in, 0.7s, stagger .05 (medium waits for [data-services-trigger])
//   data-fading      every char loops opacity .33 <-> 1 with a random delay
//   .lines-block     hairlines grow from the left
//   [data-rise]      pink buttons slide up (0.8s ease-in-out) when 15% inside the viewport
export default function Motion() {
  useEffect(() => {
    ensureLenis();
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    ScrollTrigger.config({ ignoreMobileResize: true });
    const splits = [];
    let dead = false;
    const ctx = gsap.context(() => {
      const q = (s) => gsap.utils.toArray(s);

      // ---- fading letters (hero ghost word) ----
      q('[data-fading]').forEach((el) => {
        const text = el.textContent; el.dataset.orig = text; el.textContent = '';
        [...text].forEach((ch) => {
          const s = document.createElement('span'); s.className = 'fading-letter animated'; s.textContent = ch === ' ' ? ' ' : ch;
          s.style.animationDelay = `${(1 + Math.random()).toFixed(2)}s`; el.append(s);
        });
      });

      // ---- hero hairline + bottom block (after preloader) ----
      const heroIntro = () => {
        gsap.to('.hero-bottom-block', { opacity: 1, duration: 0.6, delay: 0.5, ease: 'power1.out' });
        gsap.fromTo('.hero-divider', { scaleX: 0 }, { scaleX: 1, duration: 1, delay: 0.6, ease: 'power1.out' });
      };
      if (reduce) gsap.set('.hero-bottom-block', { opacity: 1 });

      // ---- paragraph word reveal ----
      const paras = q('[data-animate-p]');
      const smallIndent = q('[data-animate-p][data-small-indent]');
      const indent = q('[data-animate-p][data-indent]');
      const applyIndent = (els, d, m) => els.forEach((el) => {
        el.querySelectorAll('.word').forEach((w) => (w.style.marginLeft = '0'));
        const w = el.querySelector('.word'); if (w) w.style.marginLeft = innerWidth >= 768 ? d : m;
      });
      const indents = () => { applyIndent(smallIndent, '5.8vw', '16.8vw'); applyIndent(indent, '12.3vw', '24.6vw'); };

      const playWords = (el, extra = 0) => {
        const delay = (parseFloat(el.dataset.delay) || 0) + extra;
        gsap.to(el.querySelectorAll('.word'), { y: '0%', opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power1.out', delay });
      };

      const run = () => {
        if (dead) return;
        if (!reduce) {
          const indentFor = (el) => (el.hasAttribute('data-indent') ? (innerWidth >= 768 ? '12.3vw' : '24.6vw') : el.hasAttribute('data-small-indent') ? (innerWidth >= 768 ? '5.8vw' : '16.8vw') : '0');
          paras.forEach((el) => {
            const manual = el.hasAttribute('data-lines');
            // free-flowing paragraphs are measured WITH their indent so the line breaks survive the margin swap
            if (!manual) el.style.textIndent = indentFor(el);
            splits.push(new SplitType(el, { types: manual ? 'words' : 'lines, words', tagName: 'span', lineClass: 'line', wordClass: 'word' }));
            if (!manual) el.style.textIndent = '0';
            gsap.set(el.querySelectorAll('.word'), { y: '100%', opacity: 0 });
          });
          indents();
          const firstLoad = paras.filter((el) => el.hasAttribute('data-first-load'));
          const rest = paras.filter((el) => !el.hasAttribute('data-first-load'));
          ScrollTrigger.batch(rest, { start: 'top 80%', once: true, onEnter: (b) => b.forEach((el) => playWords(el)) });
          const go = () => { firstLoad.forEach((el) => playWords(el)); heroIntro(); };
          if (window.__zocialIntro) go(); else window.addEventListener('zocial:intro', go, { once: true });
        } else heroIntro();

        // ---- char fades ----
        if (!reduce) {
          [...q('[data-animate-large]'), ...q('[data-animate-medium]')].forEach((el) => splits.push(new SplitType(el, { types: 'lines, words, chars', tagName: 'span' })));
          q('[data-animate-large]').forEach((el) => gsap.from(el.querySelectorAll('.char'), {
            opacity: 0, duration: 0.7, ease: 'power1.out', stagger: 0.05, delay: parseFloat(el.dataset.delay) || 0,
            scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
          }));
          q('[data-animate-medium]').forEach((el) => gsap.from(el.querySelectorAll('.char'), {
            opacity: 0, duration: 0.7, ease: 'power1.out', stagger: 0.05,
            scrollTrigger: { trigger: '[data-services-trigger]', start: 'top 90%', toggleActions: 'play none none none' },
          }));

          // hairlines grow from the left
          q('.lines-block').forEach((b) => gsap.from(b.querySelectorAll('.divider.has--grow'), {
            scaleX: 0, duration: 1.4, ease: 'power2.out', stagger: 0.15,
            scrollTrigger: { trigger: b, start: 'top 85%', once: true },
          }));
          q('.divider.is--footer').forEach((d) => gsap.from(d, { scaleX: 0, duration: 1.4, ease: 'power2.out', scrollTrigger: { trigger: d, start: 'top 95%', once: true } }));
        }
        ScrollTrigger.refresh();
      };

      // ---- buttons rise ----
      if (!reduce) {
        q('[data-rise]').forEach((w) => {
          const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { w.classList.add('risen'); io.disconnect(); } }, { rootMargin: '0px 0px -15% 0px' });
          io.observe(w);
        });
      } else q('[data-rise]').forEach((w) => w.classList.add('risen'));

      fontsReady().then(run);
      window.addEventListener('resize', indents);
    });

    return () => {
      dead = true;
      ctx.revert();
      splits.forEach((s) => s.revert());
      window.removeEventListener('resize', () => {});
      document.querySelectorAll('[data-fading]').forEach((el) => { if (el.dataset.orig) { el.textContent = el.dataset.orig; delete el.dataset.orig; } });
    };
  }, []);

  return null;
}
