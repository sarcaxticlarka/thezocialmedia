'use client';
import { useEffect, useRef } from 'react';

// Each digit counts up 0..n; every step (300ms) the next number rolls in on a cube face (cubeRotate 0.6s),
// the previous rolls out. Non-digits are static. Fires at 15% visibility.
export default function RollingNumber({ target, last = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timers = [];
    const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); };

    const rollDigit = (s1, s2, to, delay) => {
      let cur = 0, toggle = true;
      const step = () => {
        const a = toggle ? s1 : s2, b = toggle ? s2 : s1;
        a.textContent = cur; a.classList.add('active'); a.style.animation = 'none'; void a.offsetWidth;
        a.style.animation = 'cubeRotate 0.6s ease forwards';
        if (cur === to) { later(() => { a.style.animation = 'none'; a.classList.add('halfway'); }, 300); return; }
        toggle = !toggle; cur++;
        later(() => { b.classList.remove('active'); step(); }, 300);
      };
      later(step, delay);
    };

    const build = () => {
      el.innerHTML = '';
      [...target].forEach((ch, idx) => {
        if (!isNaN(ch) && ch !== ' ') {
          const box = document.createElement('span'); box.className = 'digit-container';
          const a = document.createElement('span'), b = document.createElement('span');
          a.className = b.className = 'digit'; box.append(a, b); el.append(box);
          const delay = last ? (idx === 0 ? 0 : idx === 1 ? 200 : 500) : Math.random() * 300;
          rollDigit(a, b, parseInt(ch, 10), delay);
        } else { const s = document.createElement('span'); s.className = 'static-char'; s.textContent = ch; el.append(s); }
      });
    };
    const io = new IntersectionObserver((en) => en.forEach((e) => e.isIntersecting && (build(), io.disconnect())), { threshold: 0.15 });
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); el.textContent = target; };
  }, [target, last]);

  return <p ref={ref} className="num" aria-label={target}>{target}</p>;
}
