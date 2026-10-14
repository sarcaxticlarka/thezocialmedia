import CubeText from './CubeText';
import Scramble from './Scramble';

export default function CustomersHero() {
  return (
    <section className="cust-hero" aria-labelledby="cust-title">
      <div className="texture-wrapper"><div className="texture-block" /><div className="texture-block is--2" /></div>
      <div className="container cust-hero__inner">
        <Scramble className="heading-xsmall" slow>[customers]</Scramble>
        <span id="cust-title" className="sr-only">Who The Zocial Media works with: events, hospitality, festive brands and new businesses</span>
        <CubeText label="Who we work with" lines={[[{ t: 'Who we' }], [{ t: 'work', c: 'has--color-black' }], [{ t: 'with', c: 'has--color-black' }]]} />
        <div className="cust-hero__row">
          <p data-animate-p="" data-lines="" data-first-load="" data-delay="1.2" data-small-indent="" className="paragraph-large has--indent">
            <span className="line">Businesses that want to be seen</span>
            <span className="line">and have something worth showing.</span>
            <span className="line">Here is who we make content for,</span>
            <span className="line">what they need and how a project runs.</span>
          </p>
          <span data-fading="" className="cust-ghost" aria-hidden="true">you</span>
        </div>
      </div>
    </section>
  );
}
