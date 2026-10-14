import CubeText from './CubeText';
import Scramble from './Scramble';
import RollingNumber from './RollingNumber';
import { STATS } from '@/lib/data';

export default function Offer() {
  return (
    <section id="about" className="offer-section">
      <div className="lines-block is--1" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => <div key={i} className="divider has--grow" />)}
        <div className="divider is--mobile has--grow" />
        <div className="divider is--mobile has--grow" />
      </div>
      <div className="padding-block">
        <div className="container">
          <div className="content-block is--relative">
            <CubeText
              label="We make only personalised content"
              lines={[
                [{ t: 'We' }],
                [{ t: 'make', c: 'has--color-black' }],
                [{ t: 'only', c: 'has--color-black-2' }],
                [{ t: 'personalised', c: 'has--color-black' }],
                [{ t: 'content' }],
              ]}
            />
            <Scramble className="paragraph-default has--color-black offer-note is--absolute">
              {'[Still a small team.\nStill shooting\nevery week.]'}
            </Scramble>

            <div className="offer-layout">
              <Scramble as="h3" className="heading-xsmall is--absolute hide_mobile" slow>[about us]</Scramble>
              <p data-animate-p="" data-small-indent="" className="paragraph-large has--indent">
                <strong className="has--weight-bold">To give your brand real</strong> <strong>growth</strong> and a story worth following, one shoot, one edit and one plan at a time.
              </p>
              <div className="count-wrapper">
                {STATS.map((s, i) => (
                  <div key={s.label} className="count-block">
                    <div className="num-wrapper"><RollingNumber target={s.target} last={i === 2} /></div>
                    <Scramble className="paragraph-default has--color-black">{s.label}</Scramble>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="texture-block" />
    </section>
  );
}
