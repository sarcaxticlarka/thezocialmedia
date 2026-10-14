import LinkBlock from './LinkBlock';
import TopButton from './TopButton';
import Scramble from './Scramble';
import { FAQ, SITE } from '@/lib/data';

export function Faq({ items = FAQ, label = '[faq]' }) {
  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="container">
        <Scramble as="h2" className="heading-xsmall" slow>{label}</Scramble>
        <span id="faq-title" className="sr-only">Frequently asked questions</span>
        {items.map((f) => (
          <details key={f.q} className="faq-item" data-cursor="click">
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="black-background" aria-hidden="true" />
      <svg className="footer-torn" viewBox="0 0 1000 50" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 0H1000V12L985 20 960 10 930 24 905 14 872 28 845 12 812 22 780 8 748 26 720 14 690 24 655 10 625 22 590 12 560 28 528 16 498 26 466 10 438 22 410 12 380 26 346 14 318 24 286 8 256 22 226 12 194 28 166 14 134 24 104 10 74 22 44 12 20 24 0 14Z" fill="#ececec" />
      </svg>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="content-block">
          <div className="svg-wrapper">
            <p data-animate-large="" className="footer-heading">stay <span className="has--color-mint">zocial</span></p>
          </div>

          <div className="layout has--bottom-margin">
            <nav className="footer-nav-block" aria-label="Footer">
              <LinkBlock href="/#about" label="About" />
              <LinkBlock href="/#services" label="Our Services" />
              <LinkBlock href="/#portfolio" label="Portfolio" />
              <LinkBlock href="/customers" label="Customers" />
              <LinkBlock href="/#form" label="Contact us" />
            </nav>
            <p data-animate-p="" data-lines="" className="paragraph-xlarge has--color-white"><span className="line">Not just content.</span><span className="line"><strong>Real impact</strong> for</span><span className="line">your brand</span></p>
            <div className="contact-grid">
              <Scramble className="paragraph-xsmall has--opacity_33">[email]</Scramble>
              <div className="media-wrapper">{SITE.email ? <LinkBlock href={`mailto:${SITE.email}`} label={SITE.email} external /> : <LinkBlock href={SITE.instagram} label="DM us on Instagram" external />}</div>
              {SITE.phone && (<><Scramble className="paragraph-xsmall has--opacity_33">[phone number]</Scramble><div className="media-wrapper"><LinkBlock href={`tel:${SITE.phone}`} label={SITE.phone} external /></div></>)}
              <Scramble className="paragraph-xsmall has--opacity_33">[social media]</Scramble>
              <div className="media-wrapper"><LinkBlock href={SITE.instagram} label="Instagram" external /></div>
            </div>
          </div>

          <div className="divider is--footer" />
          <div className="footer-bottom">
            <div className="layout has--align-center">
              <div className="privacy-block">
                <p className="paragraph-xsmall has--color-white">2026</p>
                <p className="paragraph-xsmall has--color-white">ALL RIGHTS RESERVED</p>
                <p className="paragraph-xsmall has--color-white">{SITE.handle}</p>
              </div>
              <div className="authors-wrapper">
                <div className="author-block"><p className="paragraph-xsmall has--opacity-low">[brand]</p><a href={SITE.instagram} target="_blank" rel="noopener me" className="paragraph-xsmall has--color-white is--link">{SITE.name}</a></div>
              </div>
              <TopButton />
            </div>
          </div>
        </div>
      </div>
      <div className="texture-block" style={{ opacity: 0.35 }} />
    </footer>
  );
}
