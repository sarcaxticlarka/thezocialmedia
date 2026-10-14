'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE } from '@/lib/data';
import { scrollToTarget } from '@/lib/lenisStore';
import Scramble from './Scramble';

gsap.registerPlugin(ScrollTrigger);

// Four stops. The photo cube rolls forward, the text cube rolls back, so each scroll step swaps both faces.
const FACES = [
  {
    key: 'nevin', name: 'Nevin', tag: '[founder]', no: '[01]', mono: '[N]', img: '/work/p19102538.jpg', alt: 'A small film crew setting up a shot with a camera on a tripod', pos: '50% 40%',
    quote: 'We’re not an agency. We’re a team of artists who help businesses grow online.',
    body: 'I started The Zocial Media to make content that feels human, looks sharp and moves the numbers. You work with the people who actually shoot your brand.',
  },
  {
    key: 'crew', name: 'Crew', tag: '[shoot + content]', no: '[02]', mono: '[S]', img: '/work/p8390627.jpg', alt: 'Videographer holding a camera on a stabiliser rig', pos: '50% 35%',
    quote: 'Shooters, writers and designers on one call sheet.',
    body: 'Scripts get written, locations get picked, lights go up. One crew carries an idea from the first line to the last frame.',
  },
  {
    key: 'edit', name: 'Edit', tag: '[reels + video]', no: '[03]', mono: '[E]', img: '/work/p10130153.jpg', alt: 'Red-lit edit desk with a laptop, ultrawide monitor and gimbal', pos: '50% 50%',
    quote: 'The cut is where a reel is won.',
    body: 'Pacing, sound, captions and colour tuned for a phone screen. Reels, posts and festive creatives built to be watched twice.',
  },
  {
    key: 'plan', name: 'Plan', tag: '[strategy]', no: '[04]', mono: '[P]', img: '/work/p39204845.jpg', alt: 'Team planning with colourful sticky notes on a glass wall', pos: '50% 40%',
    quote: 'Strategy first. Results are the finish line.',
    body: 'Goals, audience, calendar and ads agreed before the first shoot, so every post has a job to do.',
  },
];

const PHOTO_ORDER = ['front', 'bottom', 'back', 'top']; // faces that come to the front as the cube rolls +90deg per step
const TEXT_ORDER = ['front', 'top', 'back', 'bottom'];   // and the opposite direction for the text cube

const Text = ({ p }) => (
  <div className="slide-content">
    <div className="slide-background" />
    <h3 className="heading-large">{p.name}</h3>
    <div className="slide-text-block">
      <div className="slide-top"><p className="paragraph-default has--color-white">{p.tag}</p><p className="paragraph-default has--color-white">{p.no}</p></div>
      <div className="slide-quote-block">
        <div className="slide-center">
          <p className="paragraph-default has--color-white is--absolute" style={{ position: 'absolute' }}>{p.mono}</p>
          <blockquote className="paragraph-small has--indent">{p.quote}</blockquote>
        </div>
        <div className="slide-bottom">
          <p className="paragraph-default has--fixed-width">{p.body}</p>
          <svg className="slide-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 20c5-2 8-9 12-16 1 5 3 8 8 9-6 1-9 4-10 7z" fill="#e3262e" /></svg>
        </div>
      </div>
    </div>
    <div className="texture-wrapper"><div className="texture-block" /><div className="texture-block is--2" /></div>
  </div>
);

const Photo = ({ p }) => (
  <a href={SITE.instagram} target="_blank" rel="noopener me" data-cursor="instagram" style={{ display: 'block', width: '100%', height: '100%', position: 'relative' }}>
    <img className="swiper-image pointer" src={p.img} alt={p.alt} width="1400" height="933" loading="lazy" style={{ objectPosition: p.pos }} />
    <span className="photo-chip">{p.tag}</span>
    <div className="texture-wrapper"><div className="texture-block" /><div className="texture-block is--2" /></div>
  </a>
);

// Sticky 3D cube pair. Left cube = photo faces, right cube = text faces; scrolling rolls both through four stops.
export default function Heads() {
  const stage = useRef(null), c1 = useRef(null), c2 = useRef(null);

  useEffect(() => {
    if (innerWidth <= 767) return;
    const depth = () => -innerWidth * 0.19;
    gsap.set([c1.current, c2.current], { z: depth(), rotationX: 0, transformOrigin: '50% 50%' });
    const tl = gsap.timeline({ scrollTrigger: { trigger: stage.current, start: 'top 25%', end: 'bottom bottom', scrub: 0.6 }, defaults: { ease: 'power2.inOut' } });
    tl.to({}, { duration: 0.3 });
    for (let i = 1; i < FACES.length; i++) {
      tl.to(c1.current, { rotationX: 90 * i, duration: 1 }, '>').to(c2.current, { rotationX: -90 * i, duration: 1 }, '<').to({}, { duration: 0.45 });
    }
    const onResize = () => gsap.set([c1.current, c2.current], { z: depth() });
    window.addEventListener('resize', onResize);
    return () => { tl.scrollTrigger?.kill(); tl.kill(); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <section className="heads-section" aria-labelledby="heads-label">
      <div className="texture-block" />
      <div className="texture-block is--2" />
      <div className="padding-block has--z-index-high">
        <div className="container">
          <div className="content-block is--relative has--perspective">
            <Scramble as="h2" className="heading-xsmall has--color-black heads-label" slow>{'[Who will\nyou cooperate with?]'}</Scramble>
            <span id="heads-label" className="sr-only">Who will you cooperate with: the founder, the crew, the editors and the strategists</span>

            <div ref={stage} className="cube-stage">
              <div className="cube-container">
                <div ref={c1} className="cube is--1">
                  {FACES.map((p, i) => <div key={p.key} className={`side ${PHOTO_ORDER[i]}`}><Photo p={p} /></div>)}
                </div>
                <div ref={c2} className="cube is--2">
                  {FACES.map((p, i) => <div key={p.key} className={`side ${TEXT_ORDER[i]}`}><Text p={p} /></div>)}
                </div>
              </div>
            </div>

            <div className="team-swiper">
              {FACES.map((p) => (
                <article key={p.key} className="team-slide">
                  <img src={p.img} alt={p.alt} width="1400" height="933" loading="lazy" style={{ objectPosition: p.pos }} />
                  <div className="team-copy"><h3 className="heading-large">{p.name}</h3><p className="paragraph-default has--color-white">{p.tag}</p><p className="paragraph-small" style={{ marginTop: '3vw' }}>{p.quote}</p></div>
                </article>
              ))}
            </div>

            <div className="heads-cta">
              <div className="button-lottie-wrapper is--centered">
                <div className="pink-button-wrapper" data-rise="">
                  <a id="custom-button" className="pink-button is--centered" href="#form" data-cursor="click" onClick={(e) => { e.preventDefault(); scrollToTarget('#form'); }}>
                    <p className="button-text">lets<br />talk with us!</p>
                    <svg className="plus-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M8 0h4v8h8v4h-8v8H8v-8H0V8h8z" fill="#ececec" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
