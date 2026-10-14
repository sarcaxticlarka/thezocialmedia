'use client';
import Link from 'next/link';
import { SITE } from '@/lib/data';

// Honest placeholder: no invented testimonials. Replace with real customer stories as projects wrap.
export default function Stories() {
  return (
    <section className="reasons-section cust-stories" aria-labelledby="stories-title">
      <div className="padding-block">
        <div className="container">
          <div className="content-block is--relative">
            <p className="heading-xsmall has--color-white" style={{ opacity: 0.6 }}>[customer stories]</p>
            <h2 id="stories-title" className="heading-xlarge has--fixed-width" style={{ textAlign: 'left', marginTop: '2vw' }} data-animate-large="">
              your story <span className="has--low-opacity">goes here</span>
            </h2>
            <p data-animate-p="" className="paragraph-large has--color-white cust-stories__p">
              We would rather show real results than write fake ones. Customer stories land here as projects wrap. Want to be the first?
            </p>
            <div className="cust-stories__cta">
              <div className="button-lottie-wrapper">
                <div className="pink-button-wrapper" data-rise="">
                  <Link className="pink-button" href="/#form" data-cursor="click">
                    <p className="button-text">Start a<br />project</p>
                    <svg className="plus-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M8 0h4v8h8v4h-8v8H8v-8H0V8h8z" fill="#ececec" /></svg>
                  </Link>
                </div>
              </div>
              <a className="heads-link" style={{ color: '#ececec', borderColor: '#ececec', margin: 0 }} href={SITE.instagram} target="_blank" rel="noopener me" data-cursor="instagram">See the feed <span aria-hidden="true">→</span></a>
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
