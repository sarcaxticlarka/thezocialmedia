'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SEGMENTS } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

const Arrow = ({ className }) => (
  <svg className={className} viewBox="0 0 105 104" fill="none" aria-hidden="true">
    <path d="M104.2 51.9 53.9 1.7a1.9 1.9 0 0 0-2.7 2.7l40.3 40.3a7.4 7.4 0 0 1 0 10.5L51.2 96.2a1.9 1.9 0 0 0 2.7 2.7z" fill="#191A19" stroke="#191A19" />
    <rect x="1" y="50" width="97" height="4.48" fill="#191A19" stroke="#191A19" />
  </svg>
);

function Row({ s, open, onToggle }) {
  const item = useRef(null), hover = useRef(null), panel = useRef(null), marquee = useRef(null);

  useEffect(() => { gsap.to(panel.current, { height: open ? 'auto' : 0, duration: 0.7, ease: 'power3.inOut', onComplete: () => ScrollTrigger.refresh() }); }, [open]);

  useEffect(() => {
    if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    const block = item.current.querySelector('.project-block'), wrap = item.current.querySelector('.divider-wrapper');
    let x = null, raf = null, t;
    const mv = (e) => { x = e.clientX; if (raf) return; raf = requestAnimationFrame(() => { raf = null; const r = wrap.getBoundingClientRect(); hover.current.style.transform = `rotateZ(${((x - r.left) / r.width - 0.5) * -10}deg)`; }); };
    const lv = () => { t = setTimeout(() => (hover.current.style.transform = 'rotateZ(0deg)'), 200); };
    block.addEventListener('mousemove', mv, { passive: true }); block.addEventListener('mouseleave', lv);
    return () => { block.removeEventListener('mousemove', mv); block.removeEventListener('mouseleave', lv); clearTimeout(t); };
  }, []);

  const word = (k) => <h2 key={k} className="heading-large has--low-opacity">{s.name}</h2>;
  return (
    <li ref={item} className={`project-item${open ? ' is--open' : ''}`}
      onMouseEnter={() => marquee.current?.classList.add('active')}
      onMouseLeave={() => setTimeout(() => marquee.current?.classList.remove('active'), 100)}>
      <div className="project-block" role="button" tabIndex={0} aria-expanded={open} data-cursor={open ? 'close' : 'open'}
        onClick={onToggle} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onToggle())}>
        <div className="dropdown-toggle">
          <div className="dropdown-toggle-inner">
            <h3 className="heading-small"><span style={{ opacity: 0.45, marginRight: '1.2vw' }}>{s.no}</span>{s.name}</h3>
            <div className="tail">
              <div className="category-list">{s.we.slice(0, 3).map((l) => <p key={l}>{l.toLowerCase()}</p>)}</div>
              <Arrow className="dropdown-icon" />
            </div>
          </div>
        </div>
        <div className="divider-wrapper"><div ref={hover} className="hover-wrap" /></div>
        <div className="border-block" />
      </div>
      <div ref={panel} className="dropdown-list" style={{ height: 0 }} aria-hidden={!open}>
        <div className="dropdown-list-inner">
          <div className="name-wrapper" aria-hidden="true">
            <div ref={marquee} className="name-marquee">
              {[0, 1].map((k) => <div key={k} className="name-marquee-part">{word(1)}{word(2)}</div>)}
            </div>
          </div>
          <div className="project-info">
            <img className="project-image" src={s.img} alt={s.alt} width="512" height="640" loading="lazy" />
            <div className="project-description-wrapper">
              <div className="project-description-block"><p className="paragraph-default"><strong>What they want:</strong></p><p className="seg-text">{s.needs}</p></div>
              <div className="project-description-block"><p className="paragraph-default"><strong>What we do:</strong></p>
                <div className="service-list">{s.we.map((l) => <div key={l} className="service-item"><div className="list-icon" /><p className="seg-text">{l}</p></div>)}</div>
              </div>
              <div className="project-description-block"><p className="paragraph-default has--color-pink"><strong>On our feed:</strong></p><p className="seg-text">{s.proof}</p></div>
            </div>
          </div>
          <a className="project-link" href={s.url} target="_blank" rel="noopener" data-cursor="view">See the post ↗</a>
        </div>
      </div>
    </li>
  );
}

export default function Segments() {
  const [openId, setOpenId] = useState('events');
  const list = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.project-item').forEach((el) => gsap.from(el, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } }));
    }, list);
    return () => ctx.revert();
  }, []);
  return (
    <section className="projects-section cust-segments" aria-labelledby="seg-title">
      <div className="padding-block">
        <div className="container-large">
          <h2 id="seg-title" className="sr-only">Types of customers we make content for</h2>
          <ul ref={list} className="project-list">
            {SEGMENTS.map((s) => <Row key={s.id} s={s} open={openId === s.id} onToggle={() => setOpenId(openId === s.id ? null : s.id)} />)}
          </ul>
        </div>
      </div>
      <div className="texture-block" />
      <div className="texture-block is--2" />
    </section>
  );
}
