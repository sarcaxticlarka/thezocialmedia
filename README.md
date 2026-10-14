# The Zocial Media

Next.js (App Router) site for **The Zocial Media** ([@thezocialmediaofficial](https://www.instagram.com/thezocialmediaofficial/)).
All copy, imagery and the loader/transition shader are original to this project. Internal research notes on other agency sites live in `docs/reference/` and are not shipped.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Stack
Next.js 16, React 19, GSAP + ScrollTrigger, Lenis (lerp .1, wheel x.7), SplitType, three.js (hero eye), ogl (ripped-paper shader), interact.js (draggable cards).
Fonts are self-hosted (Fontsource): system **Impact** with **Anton** fallback for display, **Inter Tight** for body.

## Structure
| Path | What |
|---|---|
| `app/layout.js` | metadata, Open Graph/Twitter, JSON-LD (Organization, ProfessionalService, WebSite, FAQPage) |
| `app/sitemap.js`, `robots.js`, `manifest.js` | SEO files |
| `app/globals.css` | vw-based design system (desktop + <=767px), paper texture layers |
| `components/Preloader.jsx` + `lib/paperTransition.js` | "hello zocial" marquee + ripped-paper WebGL reveal |
| `components/Hero.jsx`, `EyeCanvas.jsx`, `HeroLoop.jsx` | hero, 3D eye following the cursor, mobile tagline loop |
| `components/Offer.jsx`, `CubeText.jsx`, `Scramble.jsx`, `RollingNumber.jsx` | rolling headline, scramble labels, rolling counters |
| `components/Reasons.jsx` | draggable paper cards |
| `components/Projects.jsx` | filter dropdown + accordion rows with tilting hover bar |
| `components/Heads.jsx` | sticky 3D team cube |
| `components/Stack.jsx` | scroll-driven 3D card stack (reviews mechanic) |
| `components/Services.jsx`, `Chess.jsx`, `Form.jsx`, `Footer.jsx` | services cubes, drip CTA, madlib form, footer + FAQ |
| `components/Motion.jsx`, `Cursor.jsx`, `TransitionLayer.jsx` | global reveals, custom cursor, page wipe |
| `app/customers/page.js` + `CustomersHero`, `Segments`, `Journey`, `Stories` | the customer page: who we work with, what they need, how a project runs, FAQ, contact form |
| `lib/data.js` | all content (posts, cards, services, FAQ, site constants) |

## Before going live
1. `lib/data.js` -> `SITE.url` (assumed `https://thezocialmedia.com`), `SITE.email`, `SITE.phone`.
2. Optional form backend: set `NEXT_PUBLIC_FORM_ENDPOINT` (Formspree/Getform/etc.). With neither endpoint nor email the form copies the message and opens Instagram.
3. Replace `public/logo.jpg` (150px Instagram avatar) and `public/ig/*` (512px post images) with the original files. Add a 1200x630 `public/og-image.jpg`.
4. `/customers` (`SEGMENTS`, `JOURNEY`, `CUSTOMER_FAQ` in `lib/data.js`) is written from what the feed shows plus a plain description of the process; check the wording, and add real customer stories to `components/Stories.jsx` when you have them. Add real testimonials/results when the client has them: `STACK` in `lib/data.js` currently shows the feed instead of invented reviews.
5. Photos in `public/work/` are Pexels stock (see `docs/IMAGE-CREDITS.md`); replace with the crew's own set photos when available.
