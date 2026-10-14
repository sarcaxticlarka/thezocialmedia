'use client';
import { useEffect, useRef } from 'react';
import { SERVICES } from '@/lib/data';
import { scrollToTarget } from '@/lib/lenisStore';

// Four 3D cubes. Each wrapper starts rolled back (rotateX -90deg) and rolls into view on scroll (staggered);
// hovering rolls it forward 90deg to the title-only face (CSS), a second hover-out rolls it back.
export default function Services() {
  const wrap = useRef(null);

  useEffect(() => {
    const cubes = [...wrap.current.querySelectorAll('.service-cube-wrapper')];
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { cubes.forEach((c) => c.classList.add('in')); return; }
    const io = new IntersectionObserver((en) => {
      if (en.some((e) => e.isIntersecting)) { cubes.forEach((c, i) => setTimeout(() => c.classList.add('in'), i * 150)); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="services" className="services-section" aria-labelledby="services-title">
      <div className="padding-block is--larger">
        <div className="container">
          <div className="content-block is--relative is-centered">
            <h2 id="services-title" data-animate-large="" className="heading-xlarge has--low-opacity">services</h2>
            <div ref={wrap} data-services-trigger="" className="services-wrapper">
              {SERVICES.map((s, i) => {
                const tone = s.tone === 'blue' ? ' is--blue' : s.tone === 'red' ? ' is--red' : '';
                return (
                  <div key={s.id} className={`service-cube-wrapper is--${i + 1}`}>
                    <a href="#form" className={`services-block${tone}`} data-cursor="click" onClick={(e) => { e.preventDefault(); scrollToTarget('#form'); }}>
                      <h3 data-animate-medium="" className="heading-medium">{s.title}</h3>
                      <div className="plus-block"><svg className="plus-image" viewBox="0 0 20 20" aria-hidden="true"><rect y="8" width="20" height="4" /><rect x="8" width="4" height="20" /></svg></div>
                      <p className="paragraph-default">{s.text.map((l, k) => <span key={k}>{l}{k < s.text.length - 1 && <br />}</span>)}</p>
                      <svg className="arrow-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 0h17v17h-3V5.1L2.1 20 0 17.9 14.9 3H3z" /></svg>
                      <div className="services-top" />
                    </a>
                    <div className={`service-front${tone}`} aria-hidden="true"><h3 className="heading-medium">{s.title}</h3></div>
                  </div>
                );
              })}
            </div>
            <p className="services-note heading-small" style={{ color: '#ececec', fontSize: '2vw' }}>
              Not sure what you need? <a className="has--underline" href="#form" data-cursor="click" onClick={(e) => { e.preventDefault(); scrollToTarget('#form'); }}>Choose suitable services</a>
            </p>
          </div>
        </div>
      </div>
      <div className="pink-background" />
      <div className="texture-block is--2" />
    </section>
  );
}
