import EyeCanvas from './EyeCanvas';
import HeroLoop from './HeroLoop';

// Server-rendered markup (full text in the HTML for SEO); Motion.jsx and EyeCanvas add the animation.
export default function Hero() {
  return (
    <section id="top" className="hero-section is--grey">
      <div className="texture-wrapper">
        <div className="texture-block" />
        <div className="texture-block is--2" />
      </div>
      <EyeCanvas />
      <img src="/eye.svg" alt="" width="500" height="820" className="hero-eye-fallback" />

      <div className="container">
        <div className="content-block is--hero">
          <div className="hero-layout">
            <p data-animate-p="" data-lines="" data-indent="" data-first-load="" data-delay="2" className="paragraph-xlarge has-indent line-padding">
              <span className="line">We’re not</span><span className="line">an agency,</span><span className="line">we’re a team</span><span className="line">of <strong>artists</strong></span>
            </p>
            <div className="hero-text-wrapper hero-right">
              <h2 className="heading-xsmall is--absolute" style={{ top: '-2.4vw', left: 0 }}>[zocial]</h2>
              <div className="hero-divider" />
              <p data-animate-p="" data-lines="" data-first-load="" data-delay="2.5" className="paragraph-xlarge line-padding">
                <span className="line">For</span><span className="line">every</span><span className="line"><strong>business</strong></span>
              </p>
              <p data-animate-p="" data-first-load="" data-delay="2.75" className="paragraph-default has--color-black has--align-right has--smaller-width">
                a quick, creative and effective story can be found. Contact us &amp; we will shoot it for you!
              </p>
              <svg className="smile-icon" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                <circle cx="22" cy="22" r="20" stroke="#191a19" strokeWidth="3" />
                <circle cx="15" cy="17" r="2.6" fill="#191a19" /><circle cx="29" cy="17" r="2.6" fill="#191a19" />
                <path d="M12 27c3 6 17 6 20 0" stroke="#191a19" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        <h1 style={{ margin: 0 }}>
          <span data-fading="" className="h1-main" aria-hidden="true">zocial</span>
          <span className="sr-only">The Zocial Media: social media agency for shoot, content, edit and strategy</span>
        </h1>

        <div className="hero-bottom-block">
          <img src="/logo.jpg" width="150" height="150" alt="" className="code-image is--mobile_block" />
          <div className="overflow-hidden has--no-padding">
            <p className="paragraph-medium first">Shoot. Content. Edit.</p>
            <img src="/logo.jpg" width="150" height="150" alt="The Zocial Media logo" className="code-image is--mobile_hide" />
            <p className="paragraph-medium second">Not just content. Real impact.</p>
          </div>
        </div>
      </div>
      <HeroLoop />
    </section>
  );
}
