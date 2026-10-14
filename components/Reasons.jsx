'use client';
import { useEffect, useRef } from 'react';
import interact from 'interactjs';
import { CARDS } from '@/lib/data';
import { scrollToTarget } from '@/lib/lenisStore';

// "Why we are loved": draggable, randomly rotated paper cards. Layout algorithm mirrors the original: columns =
// max(4, floor(width / (card - 70))), random gaps between -140 and -70px, random rotation -20..20deg, rows centred.
// Cards fade up (1s, delay i*0.1) when the block first enters; interact.js drag restricted to the parent.
export default function Reasons() {
  const block = useRef(null);

  useEffect(() => {
    const el = block.current;
    const items = [...el.querySelectorAll('.card')];
    let z = 1, ro;

    const arrange = () => {
      const bw = el.clientWidth, bh = el.clientHeight, iw = items[0].clientWidth, ih = items[0].clientHeight;
      const mobile = innerWidth <= 767, minGap = mobile ? -70 : -140, maxGap = -70;
      const cols = Math.max(4, Math.floor(bw / (iw + maxGap)));
      let rows = Math.ceil(items.length / cols); if (mobile) rows = Math.max(rows, 2);
      const totalH = rows * (ih + maxGap) - maxGap, offY = (bh - totalH) / 2;
      let idx = 0;
      for (let r = 0; r < rows; r++) {
        const inRow = r === rows - 1 ? items.length - idx : cols;
        const rowX = (bw - (inRow * (iw + maxGap) - maxGap)) / 2;
        for (let c = 0; c < inRow && idx < items.length; c++, idx++) {
          const it = items[idx], rg = minGap + Math.random() * (maxGap - minGap), cg = minGap + Math.random() * (maxGap - minGap);
          it.style.left = `${rowX + c * (iw + cg)}px`; it.style.top = `${offY + r * (ih + rg)}px`;
          it.style.setProperty('--rotate', `${Math.random() * 40 - 20}deg`);
          it.dataset.x = 0; it.dataset.y = 0;
        }
      }
      items.forEach((it, i) => it.style.setProperty('--animation-delay', `${i * 0.1}s`));
    };
    arrange();
    let rt; const onResize = () => { clearTimeout(rt); rt = setTimeout(() => { if (innerWidth > 767) arrange(); }, 200); };
    window.addEventListener('resize', onResize, { passive: true });

    const noScroll = (e) => e.preventDefault();
    const drag = {
      modifiers: [interact.modifiers.restrictRect({ restriction: 'parent', endOnly: true })],
      listeners: {
        move(e) {
          const t = e.target, x = (parseFloat(t.dataset.x) || 0) + e.dx, y = (parseFloat(t.dataset.y) || 0) + e.dy;
          const m = getComputedStyle(t).transform; let rot = 0;
          if (m !== 'none') { const v = m.split('(')[1].split(')')[0].split(','); rot = Math.round(Math.atan2(v[1], v[0]) * (180 / Math.PI)); }
          t.style.transition = 'transform .1s linear';
          t.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`; t.dataset.x = x; t.dataset.y = y;
        },
        start(e) { z++; e.target.style.zIndex = z; if (innerWidth <= 991) document.addEventListener('touchmove', noScroll, { passive: false }); },
        end() { document.removeEventListener('touchmove', noScroll); },
      },
    };
    items.forEach((it) => interact(it).draggable(drag));

    const io = new IntersectionObserver((en) => en.forEach((e) => {
      if (e.isIntersecting) { el.classList.add('animate'); io.disconnect(); }
    }), { threshold: 0 });
    io.observe(el);
    // transition resets after the entrance, like the original's transitionend handler
    const settle = (e) => { if (e.propertyName === 'transform') e.target.style.transition = 'transform 0.1s linear'; };
    el.addEventListener('transitionend', settle);

    return () => { items.forEach((it) => interact(it).unset()); io.disconnect(); window.removeEventListener('resize', onResize); el.removeEventListener('transitionend', settle); };
  }, []);

  return (
    <section className="reasons-section" aria-labelledby="why-title">
      <div className="padding-block">
        <div className="container">
          <div className="content-block is--relative">
            <div className="h2-wrapper">
              <h2 id="why-title" className="heading-xlarge has--fixed-width" data-animate-large="">why <span className="has--low-opacity">people</span></h2>
              <div className="heading-xlarge has--fixed-width has--minus-margin" aria-hidden="true" data-animate-large="">
                stay with us
              </div>
            </div>

            <div ref={block} className="center-block">
              <div className="drag-block">
                {CARDS.map((c, i) => c.type === 'photo' ? (
                  <div key={i} className="card is--photo" data-cursor="drag">
                    <img className="card-image" src={c.img} alt={c.alt} width="512" height="640" loading="lazy" draggable="false" />
                    <div className="card-text-block"><h3 className="card-text">{c.title}</h3><p className="date">{c.date}</p></div>
                    <div className="paper-topper" />
                  </div>
                ) : (
                  <div key={i} className={`card is--text is--${c.tone === 'red' ? 'pink' : 'blue'}`} data-cursor="drag">
                    <h3 className="heading-medium is--card">{c.title}</h3>
                    <p className="paragraph-default has--align-right">{c.text}</p>
                    <div className="paper-topper" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bottom-block">
              <div className="button-lottie-wrapper">
                <div className="pink-button-wrapper" data-rise="">
                  <a className="pink-button" href="#form" data-cursor="click" onClick={(e) => { e.preventDefault(); scrollToTarget('#form'); }}>
                    <p className="button-text">Let’s make<br />something</p>
                    <svg className="plus-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M8 0h4v8h8v4h-8v8H8v-8H0V8h8z" fill="#ececec" /></svg>
                  </a>
                </div>
              </div>
              <div className="marquee-wrapper" aria-hidden="true">
                <div className="marquee-block">
                  {[0, 1].map((k) => (
                    <div key={k} className="marquee-part has--bold-text">
                      {[0, 1, 2, 3].map((n) => <p key={n} className="paragraph-small"><strong>Ready when you are</strong></p>)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pink-background" />
      <div className="texture-block" />
      <div className="texture-block is--2" />
    </section>
  );
}
