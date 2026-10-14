'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CATEGORIES, PROJECTS, SITE } from '@/lib/data';
import { scrollToTarget } from '@/lib/lenisStore';

gsap.registerPlugin(ScrollTrigger);

const Arrow = ({ className }) => (
  <svg className={className} viewBox="0 0 105 104" fill="none" aria-hidden="true">
    <path d="M104.2 51.9 53.9 1.7a1.9 1.9 0 0 0-2.7 2.7l40.3 40.3a7.4 7.4 0 0 1 0 10.5L51.2 96.2a1.9 1.9 0 0 0 2.7 2.7z" fill="#191A19" stroke="#191A19" />
    <rect x="1" y="50" width="97" height="4.48" fill="#191A19" stroke="#191A19" />
  </svg>
);

function Cube({ children }) {
  return (
    <span className="heading-large has--color-black hover-animation smaller" aria-hidden="false">
      <span className="text-line-container">
        <span className="text-line line-front">{children}</span>
        <span className="text-line line-top" aria-hidden="true">{children}</span>
      </span>
    </span>
  );
}

function Row({ p, open, onToggle }) {
  const item = useRef(null), hover = useRef(null), panel = useRef(null), marquee = useRef(null);

  useEffect(() => {
    const h = open ? 'auto' : 0;
    gsap.to(panel.current, { height: h, duration: 0.7, ease: 'power3.inOut', onComplete: () => ScrollTrigger.refresh() });
  }, [open]);

  // black bar tilts with the pointer: rotateZ(((x - left) / width - .5) * -10deg), rAF throttled, reset after 200ms
  useEffect(() => {
    if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    const block = item.current.querySelector('.project-block'), wrap = item.current.querySelector('.divider-wrapper');
    let x = null, raf = null, t;
    const mv = (e) => {
      x = e.clientX; if (raf) return;
      raf = requestAnimationFrame(() => { raf = null; const r = wrap.getBoundingClientRect(); hover.current.style.transform = `rotateZ(${((x - r.left) / r.width - 0.5) * -10}deg)`; });
    };
    const lv = () => { t = setTimeout(() => (hover.current.style.transform = 'rotateZ(0deg)'), 200); };
    block.addEventListener('mousemove', mv, { passive: true }); block.addEventListener('mouseleave', lv);
    return () => { block.removeEventListener('mousemove', mv); block.removeEventListener('mouseleave', lv); clearTimeout(t); };
  }, []);

  const word = (k) => <h2 key={k} className="heading-large has--low-opacity">{p.name}</h2>;
  return (
    <li ref={item} className={`project-item${open ? ' is--open' : ''}`} data-categories={p.tags.join(' ')}
      onMouseEnter={() => marquee.current?.classList.add('active')}
      onMouseLeave={() => setTimeout(() => marquee.current?.classList.remove('active'), 100)}>
      <div className="project-block" role="button" tabIndex={0} aria-expanded={open} data-cursor={open ? 'close' : 'click'}
        onClick={onToggle} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onToggle())}>
        <div className="dropdown-toggle">
          <div className="dropdown-toggle-inner">
            <h3 className="heading-small">{p.name}</h3>
            <div className="tail">
              <div className="category-list">{p.labels.slice(0, 3).map((l) => <p key={l}>{l}</p>)}</div>
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
            <img className="project-image" src={p.img} alt={`${p.name}: ${p.format} by The Zocial Media`} width="512" height="640" loading="lazy" />
            <div className="project-description-wrapper">
              <div className="project-description-block"><p className="paragraph-default"><strong>Format:</strong></p><p className="paragraph-xsmall" style={{ fontSize: '.83vw' }}>{p.format}</p></div>
              <div className="project-description-block"><p className="paragraph-default"><strong>Services:</strong></p>
                <div className="service-list">{p.labels.map((l) => <div key={l} className="service-item"><div className="list-icon" /><p className="paragraph-xsmall" style={{ fontSize: '.83vw' }}>{l}</p></div>)}</div>
              </div>
              <div className="project-description-block"><p className="paragraph-default"><strong>Idea:</strong></p><p className="paragraph-xsmall" style={{ fontSize: '.83vw' }}>{p.idea}</p></div>
              <div className="project-description-block"><p className="paragraph-default has--color-pink"><strong>Goal:</strong></p><p className="paragraph-xsmall" style={{ fontSize: '.83vw' }}>{p.goal}</p></div>
            </div>
          </div>
          <a className="project-link" href={p.url} target="_blank" rel="noopener" data-cursor="view">View on Instagram ↗</a>
        </div>
      </div>
    </li>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [menu, setMenu] = useState(false);
  const [openId, setOpenId] = useState(null);
  const sel = useRef(null), items = useRef(null);

  const counts = useMemo(() => Object.fromEntries(CATEGORIES.map((c) => [c.value, c.value === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.tags.includes(c.value)).length])), []);
  const current = CATEGORIES.find((c) => c.value === filter);
  const visible = PROJECTS.filter((p) => filter === 'all' || p.tags.includes(filter));

  useEffect(() => {
    // honour ?category= like the original
    const c = new URLSearchParams(location.search).get('category');
    if (c && CATEGORIES.some((x) => x.value === c)) setFilter(c);
  }, []);
  useEffect(() => { const close = () => setMenu(false); document.addEventListener('click', close); return () => document.removeEventListener('click', close); }, []);
  useEffect(() => { requestAnimationFrame(() => ScrollTrigger.refresh()); }, [filter]);

  // rows fade up as they scroll in
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.project-item').forEach((el) => gsap.from(el, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } }));
    }, items);
    return () => ctx.revert();
  }, []);

  const Header = ({ c, selected }) => (
    <div className="layout is--filter">
      <div className="divider is--black is--filter" />
      <div className="project-count-block"><h3 className="heading-large is--count">[ {counts[c.value]} ]</h3></div>
      <Cube>{c.heading}</Cube>
      <div className="filter-block">
        <p className="paragraph-default has--color-black"><strong>{c.subtext}</strong></p>
        {selected && <svg className="filter-icon" style={{ transform: menu ? 'rotateZ(-45deg)' : 'rotateZ(0)' }} viewBox="0 0 105 104" fill="none" aria-hidden="true"><path d="M104.2 51.9 53.9 1.7a1.9 1.9 0 0 0-2.7 2.7l40.3 40.3a7.4 7.4 0 0 1 0 10.5L51.2 96.2a1.9 1.9 0 0 0 2.7 2.7z" /><rect x="1" y="50" width="97" height="4.48" /></svg>}
      </div>
    </div>
  );

  return (
    <section id="portfolio" className="projects-section" aria-labelledby="work-title">
      <div className="padding-block">
        <div className="container-large">
          <h2 id="work-title" className="sr-only">Cases: posts and reels from The Zocial Media</h2>
          <div className="filter-wrap" ref={sel}>
            <div className="custom-select" data-cursor="click">
              <div className="select-selected" role="button" tabIndex={0} aria-haspopup="listbox" aria-expanded={menu}
                onClick={(e) => { e.stopPropagation(); setMenu((m) => !m); }}
                onKeyDown={(e) => e.key === 'Enter' && setMenu((m) => !m)}>
                <Header c={current} selected />
              </div>
              <div className="select-items" style={{ maxHeight: menu ? `${CATEGORIES.length * 10.78}vw` : 0 }} role="listbox">
                {CATEGORIES.filter((c) => c.value !== filter && counts[c.value] > 0).map((c) => (
                  <div key={c.value} role="option" onClick={() => { setFilter(c.value); setOpenId(null); setMenu(false); scrollToTarget(sel.current, { offset: -20 }); }}>
                    <Header c={c} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ul ref={items} className="project-list" id="filter-wrapper">
            {PROJECTS.map((p) => {
              const show = visible.includes(p);
              return show ? <Row key={p.id} p={p} open={openId === p.id} onToggle={() => setOpenId(openId === p.id ? null : p.id)} /> : null;
            })}
          </ul>

          <div className="projects-cta">
            <div className="button-lottie-wrapper is--centered">
              <div className="pink-button-wrapper" data-rise="">
                <a className="pink-button is--centered" href={SITE.instagram} target="_blank" rel="noopener" data-cursor="click">
                  <p className="button-text">Found yourself<br />among the posts?</p>
                  <svg className="plus-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M8 0h4v8h8v4h-8v8H8v-8H0V8h8z" fill="#ececec" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="texture-block" />
      <div className="texture-block is--2" />
    </section>
  );
}
