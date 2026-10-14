'use client';
import { useEffect, useRef } from 'react';

// Rolling "cube" headline. Each line = a front face and a top face. When the block is 35% visible the front face
// rolls away (rotateX 105deg, up 2.5vw, fades) while the top face rolls in, 100ms apart per line.
// lines: [[{t:'We'}], [{t:'offer', c:'has--color-black'}]]
export default function CubeText({ lines, as: Tag = 'h2', className = '', label, hoverFlip = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const containers = [...el.querySelectorAll('.text-line-container')];
    const roll = () => containers.forEach((c, i) => setTimeout(() => {
      const f = c.querySelector('.line-front'), t = c.querySelector('.line-top');
      f.style.transform = 'rotateX(105deg) translateY(-2.5vw)'; f.style.opacity = '0';
      t.style.transform = 'rotateX(0deg) translateY(0vw)'; t.style.opacity = '1';
    }, i * 100));
    const reset = () => containers.forEach((c) => {
      const f = c.querySelector('.line-front'), t = c.querySelector('.line-top');
      f.style.transform = 'rotateX(0deg) translateY(0vw)'; f.style.opacity = '1';
      t.style.transform = 'rotateX(105deg) translateY(-2.5vw)'; t.style.opacity = '0';
    });
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { roll(); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { roll(); io.disconnect(); } });
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const seg = (l) => l.map((s, i) => <span key={i} className={s.c || ''}>{s.t}</span>);
  return (
    <Tag ref={ref} className={`heading-large cube-animation ${className}`} aria-label={label}>
      {lines.map((l, i) => (
        <span key={i} className="text-line-container" aria-hidden={!!label}>
          <span className="text-line line-front">{seg(l)}</span>
          <span className="text-line line-top" aria-hidden="true">{seg(l)}</span>
        </span>
      ))}
    </Tag>
  );
}
