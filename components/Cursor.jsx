'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

// Cursor: red dot follows the mouse (0.2s power2.out). Elements with data-cursor="click|drag|fill in|next..."
// swap it for a label pill whose characters slide up with a 0.02 stagger. Fine pointers only.
export default function Cursor() {
  const block = useRef(null), main = useRef(null), pointer = useRef(null), wrapper = useRef(null), text = useRef(null);

  useEffect(() => {
    if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    const b = block.current;
    const show = () => { b.style.opacity = '1'; document.removeEventListener('mousemove', show); };
    document.addEventListener('mousemove', show, { passive: true });
    const xTo = gsap.quickTo(b, 'x', { duration: 0.2, ease: 'power2.out' });
    const yTo = gsap.quickTo(b, 'y', { duration: 0.2, ease: 'power2.out' });
    const move = (e) => { xTo(e.clientX); yTo(e.clientY); };
    document.addEventListener('mousemove', move, { passive: true });
    const enter = () => (b.style.opacity = '1');
    const leave = () => (b.style.opacity = '0');
    document.documentElement.addEventListener('mouseenter', enter);
    document.documentElement.addEventListener('mouseleave', leave);

    let last = null, tl = null, split = null;
    const find = (t) => t.closest?.('[data-cursor]')?.dataset.cursor || null;

    const over = (e) => {
      const name = find(e.target);
      if (!name || name === last) return;
      last = name; tl?.kill(); split?.revert();
      text.current.textContent = name;
      split = new SplitType(text.current, { types: 'chars', tagName: 'span' });
      gsap.set(text.current.querySelectorAll('.char'), { yPercent: 100, opacity: 0, position: 'relative', display: 'inline-block' });
      tl = gsap.timeline();
      tl.to([main.current, pointer.current], { opacity: (i, t) => (t === pointer.current ? 1 : 0), duration: 0.1, ease: 'power1.out' }, 0)
        .to(wrapper.current, { height: '1.2vw', duration: 0.2, ease: 'power1.out' }, 0.15)
        .to(text.current.querySelectorAll('.char'), { yPercent: 0, opacity: 1, duration: 0.2, ease: 'power1.out', stagger: 0.02 }, 0.13);
    };
    const out = (e) => {
      const name = find(e.target);
      if (!name || name !== last) return;
      if (e.relatedTarget && find(e.relatedTarget) === name) return;
      tl?.kill();
      tl = gsap.timeline();
      tl.to(text.current.querySelectorAll('.char'), { yPercent: 100, opacity: 0, duration: 0.15, ease: 'power1.in', stagger: 0.02 }, 0)
        .to(wrapper.current, { height: '0vw', duration: 0.1, ease: 'power1.out' }, 0.16)
        .to([main.current, pointer.current], { opacity: (i, t) => (t === pointer.current ? 0 : 1), duration: 0.05, ease: 'power1.out' }, 0.14)
        .call(() => { split?.revert(); split = null; text.current.textContent = ''; });
      last = null;
    };
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    return () => {
      document.removeEventListener('mousemove', move); document.removeEventListener('mousemove', show);
      document.removeEventListener('mouseover', over); document.removeEventListener('mouseout', out);
      document.documentElement.removeEventListener('mouseenter', enter); document.documentElement.removeEventListener('mouseleave', leave);
      tl?.kill(); split?.revert();
    };
  }, []);

  return (
    <div className="cursor-wrapper" aria-hidden="true">
      <div ref={block} className="cursor-block">
        <div ref={main} className="cursor-main" />
        <div ref={pointer} className="cursor-pointer">
          <div ref={wrapper} className="pointer-text_wrapper"><p ref={text} className="pointer-text" /></div>
        </div>
      </div>
    </div>
  );
}
