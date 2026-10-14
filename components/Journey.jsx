import CubeText from './CubeText';
import Scramble from './Scramble';
import { JOURNEY } from '@/lib/data';

export default function Journey() {
  return (
    <section className="journey" aria-labelledby="journey-title">
      <div className="container">
        <Scramble className="heading-xsmall" slow>[how a project runs]</Scramble>
        <span id="journey-title" className="sr-only">How a project with The Zocial Media runs, in six steps</span>
        <CubeText label="From first call to published" lines={[[{ t: 'From first' }], [{ t: 'call to', c: 'has--color-black' }], [{ t: 'published', c: 'has--color-black' }]]} />
        <div className="journey-head" aria-hidden="true"><span /><span /><span>You</span><span>We</span></div>
        <ol className="journey-list">
          {JOURNEY.map((j) => (
            <li key={j.no} className="journey-row" data-cursor="">
              <span className="journey-no">{j.no}</span>
              <h3 className="journey-title">{j.title}</h3>
              <p className="journey-you">{j.you}</p>
              <p className="journey-we">{j.we}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="texture-block" />
    </section>
  );
}
