'use client';
import { useEffect, useRef } from 'react';

const RANDOM = '&1$*@&#*!(^$';
const ACCENT = '#e3262e';

// [bracket] labels: characters are typed one by one (20ms, 60ms when slow); letters flash a random symbol in the
// accent colour, cycle 10 times at 8ms, then lock to the real letter. Fires at 20% visibility.
export default function Scramble({ children, as: Tag = 'p', className = '', color = '#191a19', slow = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const final = el.textContent;
    let timers = [];
    const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); };
    const run = () => {
      if (el.dataset.animated) return;
      el.dataset.animated = 'true';
      el.textContent = '';
      let i = 0;
      const step = slow ? 60 : 20;
      const next = () => {
        if (i >= final.length) return;
        const ch = final[i];
        const span = document.createElement('span');
        if (!/[a-zA-Z0-9Ѐ-ӿ]/.test(ch)) { span.textContent = ch; span.style.color = color; el.append(span); i++; return next(); }
        let idx = Math.floor(Math.random() * RANDOM.length), cycles = 0;
        span.textContent = RANDOM[idx]; span.style.color = ACCENT; el.append(span);
        const my = i; i++;
        const cycle = () => {
          if (cycles < 10) { idx = (idx + 1) % RANDOM.length; span.textContent = RANDOM[idx]; cycles++; later(cycle, 8); }
          else { span.textContent = final[my]; span.style.color = color; }
        };
        later(cycle, 20);
        later(next, step);
      };
      next();
    };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver((en) => en.forEach((e) => e.isIntersecting && (run(), io.disconnect())), { threshold: 0.2 });
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); if (el.dataset.animated) { el.textContent = final; delete el.dataset.animated; } };
  }, [color, slow]);

  return <Tag ref={ref} className={className} style={{ whiteSpace: 'pre-line' }}>{children}</Tag>;
}
