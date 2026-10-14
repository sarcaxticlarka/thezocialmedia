'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CubeText from './CubeText';
import Scramble from './Scramble';

// CTA section. The original lays a Unicorn Studio melting-pink shader over a chess photo; here the logo "TV"
// stands in a pool of red paint that keeps dripping off the edge of a slab (GSAP-driven SVG).
export default function Chess() {
  const svg = useRef(null);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const drips = gsap.utils.toArray('.drip');
      drips.forEach((d, i) => {
        const len = d.querySelector('.drip-tail'), drop = d.querySelector('.drip-drop');
        gsap.set(len, { scaleY: 0.2, transformOrigin: '50% 0%' });
        const tl = gsap.timeline({ repeat: -1, delay: i * 0.9, repeatDelay: 0.4 });
        tl.to(len, { scaleY: 1, duration: 2.6, ease: 'sine.inOut' })
          .to(drop, { y: 150, opacity: 0, duration: 0.9, ease: 'power2.in' }, '>-0.1')
          .set(drop, { y: 0, opacity: 1 })
          .to(len, { scaleY: 0.2, duration: 1.2, ease: 'sine.inOut' });
        gsap.to(drop, { attr: { ry: 15 }, duration: 0.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      });
      gsap.to('.puddle', { attr: { rx: 270 }, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }, svg);
    return () => ctx.revert();
  }, []);

  return (
    <section className="chess-section" aria-labelledby="cta-title">
      <div className="padding-block has--large-bottom">
        <div className="container">
          <div className="content-block is--relative is-centered has--events-none">
            <div className="chess-note">
              <Scramble className="paragraph-default has--color-black">{'Want to see more?'}</Scramble>
              <Scramble className="paragraph-default has--color-black">{'Scroll the feed, then tell us\nwhat you are planning and\nwe will take it from there.'}</Scramble>
            </div>
            <div className="lines-block is--3" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => <div key={i} className="divider has--grow" />)}
            </div>
            <CubeText className="has--align-center has--larger-width" label="Make your competitors hit replay."
              lines={[[{ t: 'Make your' }], [{ t: 'competitors', c: 'has--color-black' }], [{ t: 'hit replay.' }]]} />
            <span id="cta-title" className="sr-only">Make your competitors hit replay</span>

            <div className="drip-stage" aria-hidden="true">
              <svg ref={svg} viewBox="0 0 1055 340" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="slab" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f6f6f4" /><stop offset="1" stopColor="#bdbdb8" /></linearGradient>
                  <linearGradient id="paint" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff5a60" /><stop offset="1" stopColor="#b8141c" /></linearGradient>
                </defs>
                <polygon points="60,120 995,120 1035,150 1035,185 20,185 20,150" fill="url(#slab)" />
                <polygon points="20,150 1035,150 1035,185 20,185" fill="#9c9c97" opacity=".55" />
                <ellipse className="puddle" cx="527" cy="148" rx="250" ry="26" fill="url(#paint)" />
                <image href="/logo.jpg" x="452" y="20" width="150" height="150" preserveAspectRatio="xMidYMid slice" style={{ borderRadius: 18 }} />
                {[{ x: 330, w: 22 }, { x: 700, w: 28 }, { x: 560, w: 18 }].map((d, i) => (
                  <g key={i} className="drip" transform={`translate(${d.x},170)`}>
                    <rect className="drip-tail" x={-d.w / 2} y="0" width={d.w} height="130" rx={d.w / 2} fill="url(#paint)" />
                    <ellipse className="drip-drop" cx="0" cy="136" rx={d.w * 0.55} ry="12" fill="#e3262e" />
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="texture-block" />
    </section>
  );
}
