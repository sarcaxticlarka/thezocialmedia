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

      {/* only the platforms we actually post on, floating around the eye */}
      <div className="hero-socials" aria-hidden="true">
        <a className="soc soc--ig" href="https://www.instagram.com/thezocialmediaofficial/" target="_blank" rel="noopener me" tabIndex={-1} data-cursor="instagram">
          <svg viewBox="0 0 48 48"><defs><linearGradient id="ig" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#fdc468"/><stop offset=".35" stopColor="#f0375b"/><stop offset=".7" stopColor="#c0309f"/><stop offset="1" stopColor="#5b51d8"/></linearGradient></defs><rect width="48" height="48" rx="12" fill="url(#ig)"/><rect x="12" y="12" width="24" height="24" rx="7" fill="none" stroke="#fff" strokeWidth="3"/><circle cx="24" cy="24" r="5.6" fill="none" stroke="#fff" strokeWidth="3"/><circle cx="31.4" cy="16.6" r="1.8" fill="#fff"/></svg>
        </a>
        <span className="soc soc--yt"><svg viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#ff0000"/><path d="M19.5 16.5v15l13-7.5z" fill="#fff"/></svg></span>
        <span className="soc soc--fb"><svg viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#1877f2"/><path d="M26 38V26h4l.7-4.6H26v-3c0-1.4.6-2.4 2.5-2.4H31V12c-.5 0-2-.2-3.7-.2-3.7 0-6 2.200-6 6.200v3.400H17V26h4.300v12z" fill="#fff"/></svg></span>
      </div>
      <img src="/eye.svg" alt="" width="500" height="820" className="hero-eye-fallback" />

      <div className="container">
        <div className="content-block is--hero">
          <div className="hero-layout">
            <p data-animate-p="" data-lines="" data-indent="" data-first-load="" data-delay="0.35" className="paragraph-xlarge has-indent line-padding">
              <span className="line">We’re not</span><span className="line">an agency,</span><span className="line">we’re a team</span><span className="line">of <strong>artists</strong></span>
            </p>
            <div className="hero-text-wrapper hero-right">
              <h2 className="heading-xsmall is--absolute" style={{ top: '-2.4vw', left: 0 }}>[zocial]</h2>
              <div className="hero-divider" />
              <p data-animate-p="" data-lines="" data-first-load="" data-delay="0.6" className="paragraph-xlarge line-padding">
                <span className="line">Made</span><span className="line">around</span><span className="line"><strong>your brand</strong></span>
              </p>
              <p data-animate-p="" data-first-load="" data-delay="0.8" className="paragraph-default has--color-black has--align-right has--smaller-width">
                Tell us what you sell, who it’s for and where it should be seen. We’ll make something people stop scrolling for.
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
