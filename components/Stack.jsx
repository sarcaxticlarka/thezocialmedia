'use client';
import { useEffect, useRef } from 'react';
import { STACK } from '@/lib/data';
import CubeText from './CubeText';
import Scramble from './Scramble';

// Reviews-style 3D deck (the original's scroll-driven card stack, retuned so cards land at normal size).
// Below 768px it becomes a snap carousel.
export default function Stack() {
  const rel = useRef(null);

  useEffect(() => {
    const block = rel.current;
    const slides = [...block.querySelectorAll('.swiper-slide.is--review')];
    const n = slides.length;
    let ticking = false, on = false;
    const clamp = (v) => Math.max(0, Math.min(1, v));
    const ease = (t) => 1 - Math.pow(1 - t, 3);

    // Progress runs while the sticky stage is pinned (0 = pinned at the top, 1 = about to release).
    // Card i flies out of the depth (translateZ -48vw, small, transparent) to the front (0), settling into a
    // two-column deck: even cards stack on the left, odd on the right, each one a little lower and more tilted.
    const update = () => {
      const r = block.getBoundingClientRect(), vh = innerHeight;
      if (!(r.top < vh && r.bottom > 0)) return;
      const prog = clamp(-r.top / (r.height - vh));
      slides.forEach((s, i) => {
        const start = (i / n) * 0.78, t = ease(clamp((prog - start) / 0.3));
        const side = i % 2 === 0 ? -1 : 1, rank = Math.floor(i / 2);
        const z = -48 * (1 - t);
        const x = side * (-rank * 3.2) * t;           // later cards slide toward the middle
        const y = (rank * 5.2 - 3) * t;
        const rot = side * (1.8 + rank * 1.6) * t;
        s.style.opacity = String(clamp(t * 1.6));
        s.style.zIndex = String(10 + i);
        s.style.transform = `translate3d(${x}vw, ${y}vw, ${z}vw) rotate(${rot}deg)`;
      });
    };
    const onScroll = () => { if (ticking) return; ticking = true; requestAnimationFrame(() => { ticking = false; update(); }); };
    const setup = () => {
      if (innerWidth >= 768) {
        block.style.height = `calc(100vh + ${n * 55}vh)`;
        slides.forEach((s, i) => { s.classList.toggle('is--right', i % 2 === 0); s.classList.toggle('is--left', i % 2 === 1); });
        if (!on) { addEventListener('scroll', onScroll, { passive: true }); on = true; }
        update();
      } else {
        block.style.height = '';
        slides.forEach((s) => { s.style.transform = ''; s.style.opacity = ''; s.style.zIndex = ''; });
        if (on) { removeEventListener('scroll', onScroll); on = false; }
      }
    };
    setup();
    let t; const rs = () => { clearTimeout(t); t = setTimeout(setup, 200); };
    addEventListener('resize', rs, { passive: true });
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', rs); clearTimeout(t); };
  }, []);

  return (
    <section className="reviews-section" aria-labelledby="stack-title">
      <div className="padding-block has--no-bottom">
        <div className="container">
          <div className="content-block is--relative is-centered">
            <Scramble className="paragraph-default has--color-black" >[from the feed]</Scramble>
            <div className="lines-block is--2" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => <div key={i} className="divider has--grow" />)}
            </div>
            <CubeText className="has--align-center" label="What we have been posting"
              lines={[[{ t: 'What' }], [{ t: 'we’ve' }], [{ t: 'been', c: 'has--color-black' }], [{ t: 'posting', c: 'has--color-black-2' }]]} />
            <span id="stack-title" className="sr-only">What we have been posting</span>
          </div>
        </div>
      </div>

      <div ref={rel} className="relative-block">
        <div className="container-large sticky-wrap">
          <div className="review-stage">
            {STACK.map((s) => (
              <article key={s.title} className="swiper-slide is--review">
                <div className="review-block">
                  <div className="review-left">
                    <img src={s.img} alt={`${s.name}: ${s.title}`} width="512" height="640" loading="lazy" />
                    <div><h3 className="heading-small" style={{ textTransform: 'uppercase' }}>{s.name}</h3><p className="paragraph-default" style={{ opacity: 0.6 }}>[{s.role}]</p></div>
                  </div>
                  <div className="review-right">
                    <h3>{s.title}</h3>
                    <p className="paragraph-default">{s.text}</p>
                    <div className="review-tags">{s.tags.map((t) => <span key={t} className="review-tag">{t}</span>)}</div>
                  </div>
                  <div className="hazard" />
                </div>
                <a className="review-link" href={s.url} target="_blank" rel="noopener" data-cursor="view" aria-label={`${s.title} on Instagram`} />
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="texture-block" />
    </section>
  );
}
