'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE } from '@/lib/data';
import { scrollToTarget } from '@/lib/lenisStore';
import Scramble from './Scramble';

gsap.registerPlugin(ScrollTrigger);

const PEOPLE = [
  {
    key: 'nevin', name: 'Nevin', tag: '[founder]', no: '[01]', mono: '[N]', img: '/ig/p1.jpg', alt: 'The Zocial Media: we’re not an agency poster',
    quote: 'We’re not an agency. We’re a team of artists who help businesses grow online.',
    body: 'I started The Zocial Media to make content that feels human, looks sharp and actually moves the numbers. You get people who care about your brand as much as you do.',
  },
  {
    key: 'team', name: 'Crew', tag: '[the team]', no: '[02]', mono: '[Z]', img: '/ig/p3.jpg', alt: 'The Zocial Media: this is how we create impact poster',
    quote: 'Shooters, editors, designers and writers working as one crew.',
    body: 'We plan with purpose, shoot with intent and edit with rhythm. Want to join? We hire creative people regularly. Follow us on Instagram for the next call.',
  },
];

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
    <a className="insta-link" href={SITE.instagram} target="_blank" rel="noopener me" data-cursor="instagram" aria-label="Open our Instagram" style={{ position: 'absolute', inset: 0 }} />
    <div className="texture-wrapper"><div className="texture-block" /><div className="texture-block is--2" /></div>
  </div>
);

const Photo = ({ p }) => (
  <a href={SITE.instagram} target="_blank" rel="noopener me" data-cursor="instagram" style={{ display: 'block', width: '100%', height: '100%' }}>
    <img className="swiper-image pointer" src={p.img} alt={p.alt} width="512" height="640" loading="lazy" />
    <div className="texture-wrapper"><div className="texture-block" /><div className="texture-block is--2" /></div>
  </a>
);

// Sticky 3D cube pair. Left cube = photo faces, right cube = text faces. As the page scrolls the left cube rolls
// forward (rotateX 0 -> 90) and the right cube rolls back (0 -> -90), swapping founder for crew.
export default function Heads() {
  const stage = useRef(null), c1 = useRef(null), c2 = useRef(null);

  useEffect(() => {
    if (innerWidth <= 767) return;
    const depth = () => -innerWidth * 0.19;
    gsap.set([c1.current, c2.current], { z: depth(), rotationX: 0, transformOrigin: '50% 50%' });
    const tl = gsap.timeline({ scrollTrigger: { trigger: stage.current, start: 'top 25%', end: 'bottom bottom', scrub: 0.6 }, defaults: { ease: 'power2.inOut' } });
    tl.to({}, { duration: 0.35 })
      .to(c1.current, { rotationX: 90, duration: 1 }, '>')
      .to(c2.current, { rotationX: -90, duration: 1 }, '<')
      .to({}, { duration: 0.35 });
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
            <span id="heads-label" className="sr-only">Who will you cooperate with</span>

            <div ref={stage} className="cube-stage">
              <div className="cube-container">
                <div ref={c1} className="cube is--1">
                  <div className="side front"><Photo p={PEOPLE[0]} /></div>
                  <div className="side bottom"><Photo p={PEOPLE[1]} /></div>
                </div>
                <div ref={c2} className="cube is--2">
                  <div className="side front"><Text p={PEOPLE[0]} /></div>
                  <div className="side top"><Text p={PEOPLE[1]} /></div>
                </div>
              </div>
            </div>

            <div className="team-swiper" style={{ display: 'none' }}>
              {PEOPLE.map((p) => (
                <article key={p.key} className="team-slide">
                  <img src={p.img} alt={p.alt} width="512" height="640" loading="lazy" />
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
