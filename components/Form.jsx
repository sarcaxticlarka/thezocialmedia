'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { SITE } from '@/lib/data';
import { fontsReady } from '@/lib/fonts';

gsap.registerPlugin(ScrollTrigger);

const Req = () => (
  <svg className="required-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 0h3v8.4l7.3-4.2 1.5 2.6-7.3 4.2 7.3 4.2-1.5 2.6-7.3-4.2V24h-3v-8.4l-7.3 4.2-1.5-2.6L9 12 1.7 7.8l1.5-2.6 7.3 4.2z" fill="currentColor" /></svg>
);

function Field({ id, name, label, type = 'text', placeholder, width, onFocusField, active, required = true, autoComplete }) {
  return (
    <div className="field-wrapper" style={width ? { width } : undefined}>
      <div className="text-field">
        <div className={`input-border ${active ? 'active' : 'inactive'}`} />
        <input id={id} name={name} type={type} className="text-field-input" placeholder={placeholder} required={required} autoComplete={autoComplete}
          aria-label={label} data-cursor="fill in" onFocus={() => onFocusField(id)} onBlur={(e) => { e.target.parentElement.parentElement.querySelector('.required-icon').style.transform = 'scale(1)'; }}
          onFocusCapture={(e) => { const i = e.target.parentElement.parentElement.querySelector('.required-icon'); i.style.transition = 'transform 200ms ease'; i.style.transform = 'scale(0.8)'; }} />
      </div>
      <Req />
    </div>
  );
}

export default function Form() {
  const root = useRef(null), form = useRef(null);
  const [active, setActive] = useState(null);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  // scroll-scrubbed reveal: label chars fade (1s, stagger .05) spaced .4 apart; fields clip open; asterisks pop (back.out 1.7)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const labels = [...root.current.querySelectorAll('[data-form-animate]')];
    let split, tl, dead = false;
    fontsReady().then(() => {
      if (dead || !root.current) return;
      split = new SplitType(labels, { types: 'lines, words, chars', tagName: 'span' });
      tl = gsap.timeline({ scrollTrigger: { trigger: labels[0], start: 'bottom bottom', end: 'center 35%', scrub: 4 } });
      const order = [...labels.flatMap((l) => [...l.querySelectorAll('.word')]), ...root.current.querySelectorAll('.text-field')]
        .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
      order.forEach((el, i) => {
        if (el.classList.contains('word')) tl.from(el.querySelectorAll('.char'), { opacity: 0, duration: 1, ease: 'power1.inOut', stagger: 0.05 }, i * 0.4);
        else {
          tl.fromTo(el, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: 'power1.inOut' }, i * 0.4);
          const icon = el.parentElement.querySelector('.required-icon');
          if (icon) tl.fromTo(icon, { scale: 0 }, { scale: 1, duration: 1.5, ease: 'back.out(1.7)' }, `-=${1.5 - 0.2}`);
        }
      });
      ScrollTrigger.refresh();
    });
    return () => { dead = true; tl?.scrollTrigger?.kill(); tl?.kill(); split?.revert(); };
  }, []);

  useEffect(() => { const d = (e) => { if (!e.target.closest?.('.field-wrapper')) setActive(null); }; document.addEventListener('click', d); return () => document.removeEventListener('click', d); }, []);

  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[A-Za-z]+$/.test(v);
  const isPhone = (v) => /^\+(\d{1,4})?[\d\s\-()]{7,15}$/.test(v);

  const submit = async (e) => {
    e.preventDefault();
    const f = form.current, d = Object.fromEntries(new FormData(f));
    let err = '';
    if (!['name', 'company', 'position', 'phone', 'email', 'request'].every((k) => (d[k] || '').trim())) err = 'Please fill in all required fields.';
    else if (!isEmail(d.email)) err = 'Please enter a valid email address.';
    else if (!isPhone(d.phone)) err = 'Please check your phone number, don’t forget the + and country code.';
    else if (d.request.length < 2) err = 'Your request must be at least 2 characters long.';
    setError(err);
    if (err) return;

    const text = `Hi, I’m ${d.name} and I work at ${d.company} as ${d.position}. Call me on ${d.phone} or write to ${d.email}. I’d love to talk about ${d.request}.`;
    const finish = () => { setSent(true); setTimeout(() => f.reset(), 1400); };
    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    const run = async () => {
      if (endpoint) {
        try { const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(d) }); if (!r.ok) throw 0; finish(); }
        catch { setError('Something went wrong. Please DM us on Instagram.'); }
      } else if (SITE.email) { location.href = `mailto:${SITE.email}?subject=${encodeURIComponent('New enquiry from ' + d.name)}&body=${encodeURIComponent(text)}`; finish(); }
      else { try { await navigator.clipboard.writeText(text); } catch {} window.open(SITE.instagram, '_blank', 'noopener'); finish(); }
    };
    if (window.zocialWipe) await window.zocialWipe(run); else await run();
  };

  const common = { onFocusField: setActive };
  return (
    <section id="form" className="form-section" ref={root} aria-labelledby="form-title">
      <div className="container">
        <div className="content-block">
          <h2 id="form-title" className="sr-only">Contact The Zocial Media</h2>
          <div id="form-wrapper" className={`form-wrapper${sent ? ' sent' : ''}`}>
            <form ref={form} className="form-block" noValidate onSubmit={submit}>
              <div className="form-line">
                <div className="form-line-inner">
                  <label data-form-animate="" className="paragraph-xlarge has--weight-medium" htmlFor="name-field">Hi, Iʼm</label>
                  <Field id="name-field" name="name" label="Your name" placeholder="your name" autoComplete="name" active={active === 'name-field'} {...common} />
                </div>
                <label data-form-animate="" className="paragraph-xlarge has--weight-medium" htmlFor="company-name-field">and I work at</label>
              </div>
              <div className="form-line">
                <Field id="company-name-field" name="company" label="Company" placeholder="company name" autoComplete="organization" active={active === 'company-name-field'} {...common} />
                <div className="form-line-inner">
                  <label data-form-animate="" className="paragraph-xlarge has--weight-medium" htmlFor="position-field">as</label>
                  <Field id="position-field" name="position" label="Your role" placeholder="position" autoComplete="organization-title" active={active === 'position-field'} {...common} />
                </div>
              </div>
              <div className="form-line has--align-left_mobile">
                <label data-form-animate="" className="paragraph-xlarge has--weight-medium" htmlFor="phone-field">Call me on</label>
                <Field id="phone-field" name="phone" type="tel" label="Phone" placeholder="+91 …" autoComplete="tel" active={active === 'phone-field'} {...common} />
              </div>
              <div className="form-line">
                <div className="form-line-inner">
                  <label data-form-animate="" className="paragraph-xlarge has--weight-medium" htmlFor="email-field">or write to</label>
                  <Field id="email-field" name="email" type="email" label="Email" placeholder="your email" autoComplete="email" active={active === 'email-field'} {...common} />
                </div>
                <label data-form-animate="" className="paragraph-xlarge has--weight-medium" htmlFor="request-field">Iʼd love to talk about</label>
              </div>
              <div className="form-line">
                <Field id="request-field" name="request" label="Your request" placeholder="shoot, reels, strategy…" active={active === 'request-field'} {...common} />
                <div className={`error-message${error ? ' visible' : ''}`} id="error-message" role="alert">{error || ' '}</div>
              </div>

              <div className="button-lottie-wrapper is--centered">
                <div className="pink-button-wrapper" data-rise="">
                  <button type="submit" id="button-custom" className="pink-button is--centered" data-cursor="click" style={{ border: 0, textAlign: 'left' }}>
                    <p className="button-text">Get<br />in touch</p>
                    <svg className="plus-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M8 0h4v8h8v4h-8v8H8v-8H0V8h8z" fill="#ececec" /></svg>
                  </button>
                </div>
              </div>
            </form>
            <div className={`success-wrapper${sent ? ' show' : ''}`} role="status">
              <div className="success-block">
                <div className="success-inner">
                  <div className="lines-block is--forn" aria-hidden="true"><div className="divider" /><div className="divider" /></div>
                  <h2 className="heading-large has--align-center"><span className="has--color-black">Greetings!</span></h2>
                  <p className="paragraph-xlarge">Your application has been sent<br />and we will contact you soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="texture-block" />
    </section>
  );
}
