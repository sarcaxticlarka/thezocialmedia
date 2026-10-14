'use client';
import { useEffect, useRef } from 'react';
import { STACK } from '@/lib/data';
import CubeText from './CubeText';
import Scramble from './Scramble';

// Reviews-style 3D stack. relative-block height = slides * 40vw with a sticky stage; on every scroll frame:
//   progress = clamp((vh - rect.top) / (vh + rect.height) - .05)
//   end_i    = .35 + ((n - 1 - i) / (n - 1)) * .65 ; p = min(progress / end_i, 1)
//   translateZ = -40(n - i) + (60 + 40(n - i)) * p  (vw);   translateX = +-9 * p (vw)
// Slides alternate left/right. Below 768px it becomes a snap carousel.
export default function Stack() {
  const rel = useRef(null);

  useEffect(() => {
    const block = rel.current;
    const slides = [...block.querySelectorAll('.swiper-slide.is--review')];
    let ticking = false, on = false;
    const update = () => {
      const r = block.getBoundingClientRect(), vh = innerHeight;
      if (!(r.top < vh && r.bottom > 0)) return;
      const prog = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height) - 0.05));
      slides.forEach((s, i) => {
        const end = 0.35 + ((slides.length - 1 - i) / (slides.length - 1)) * 0.65;
        const p = Math.min(prog / end, 1);
        const z0 = -40 * (slides.length - i), z = z0 + (60 - z0) * p;
        const x = s.classList.contains('is--left') ? -9 * p : 9 * p;
        s.style.transform = `translateX(${x}vw) translateZ(${z}vw)`;
      });
    };
    const onScroll = () => { if (ticking) return; ticking = true; requestAnimationFrame(() => { ticking = false; update(); }); };
    const setup = () => {
      if (innerWidth >= 768) {
        block.style.height = `${slides.length * 40}vw`;
        slides.forEach((s, i) => s.classList.add(i % 2 === 0 ? 'is--right' : 'is--left'));
        if (!on) { addEventListener('scroll', onScroll, { passive: true }); on = true; }
        update();
      } else { block.style.height = ''; slides.forEach((s) => (s.style.transform = '')); if (on) { removeEventListener('scroll', onScroll); on = false; } }
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
