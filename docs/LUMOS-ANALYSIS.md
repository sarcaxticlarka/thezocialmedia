# lumos-marketing.com: point-to-point analysis

Source: the site's live HTML, its Webflow CSS (1,900 rules), its 15 inline scripts (custom GSAP/Lenis code) and the browser pane. Everything below is what the site actually does. The right-hand column says how this repo reproduces it.

## 1. Stack
| Lumos | Here |
|---|---|
| Webflow (CMS lists, IX2 interactions) | Next.js App Router, React |
| GSAP 3.15 + ScrollTrigger | `gsap` + ScrollTrigger |
| Lenis 1.0.23 (`lerp .1`, `wheelMultiplier .7`) | `lenis` with the same values |
| SplitType 0.3.4 | `split-type` |
| Three.js (GLB eyeball, wiggle bones, EXR env) | `three`, procedural eyeball (own asset) |
| ogl shader "ripped paper" transition | `ogl`, same fragment-shader idea, own texture |
| interact.js (draggable cards) | `interactjs` |
| Swiper (mobile only) | CSS scroll-snap |
| Lottie (button fills, H/L letters, block) | CSS/SVG equivalents |
| Unicorn Studio shader (chess section) | SVG goo-filter liquid drip |

## 2. Design tokens
- Colours: black `#191a19`, paper `#ececec`, pink `#e54b8d`, mint/blue `#c0fcf8`, dark grey `#333`. Zocial mapping: pink -> brand red `#e3262e`, mint -> brand blue `#1f6bff`.
- Type: **Impact LT Std** for every display/UI string (headings, links, buttons, numbers) and **PP Neue Montreal** (Medium 500 / Bold 700) for paragraphs. Zocial: system `Impact` with self-hosted `Anton` fallback; `Inter Tight` for body.
- **Everything is sized in `vw`**, with a separate set of `vw` values under 768px. Container `max-width: 95.83vw`. Key sizes (desktop / mobile):
  - heading-xlarge 20.83 / 27.46, heading-large 9.375 / 17.6 (line-height 83%, letter-spacing -.04em), heading-medium 2.6 / 6.4, heading-small 1.25 / 6.4, heading-xsmall .83 / 3.73
  - paragraph-xlarge 4.16 / 10.66 (line-height 84%), paragraph-large 2.6 / 7.73, paragraph-medium 2.2 / 5.86, paragraph-small 1.7 / 4.8, paragraph-xsmall .625 / 3.2
  - hero giant word 30.25 / 41, footer word 19.6, stat number 7.3 / 17
  - section padding 14.6 / 37 vw
- Hairlines: `.divider` `#191a19` at 10% opacity, 0.1vw (0.26vw mobile).
- Section rhythm: grey, grey, **black**, grey (projects), grey (team), grey (reviews), **black** (services), grey (chess), grey (form), footer on black image.

## 3. Background and texture system (the "paper" feel)
1. `.texture-block`: full-section absolutely-positioned layer, `pointer-events:none`, `z-index:9999`, a scanned-paper webp repeated at 100% width, **`mix-blend-mode: multiply`**. A second layer (`.is--2`) at 70% opacity uses **`color-burn`**. These sit on every section, so greys always look like paper and blacks look like card.
2. **Black sections** (reasons, services) use a near-black `#191a19` plus a blurred, glowing pink "silk" photo (`new-pink-background`, opacity .9; upside-down version under services). On mobile it is enlarged to 300vw.
3. **Torn-paper edges**: `black-background` (projects/team transition) and `footer-background` are black images whose top edge is a ripped-paper silhouette, anchored `bottom:0`.
4. Cards (`paper-topper`) get a crumpled-paper image with **`color-burn`**.
5. Hero is flat grey; the hero ghost word `lumos` is white (`#fff`) on grey, so it only reads through the texture.
6. Zocial: the textures are generated (SVG fractal noise for paper, CSS gradients + blur for the glow, an SVG path for the torn edge), so no Lumos imagery is reused.

## 4. Page structure (top to bottom)
1. Preloader (pink, WebGL ripped-paper canvas)
2. Navbar (absolute, `z 9998`)
3. Hero (grey)
4. Offer / about (grey, hairlines)
5. Reasons "why we are loved" (black, draggable cards)
6. Projects (grey, filter + accordion list)
7. Team cube (grey, sticky 3D cube, torn black edge at the bottom)
8. Reviews (grey, 3D card stack on scroll)
9. Services (black, 4 3D cubes)
10. Chess CTA (grey, shader image + giant heading)
11. Form (grey, madlib form)
12. Footer (black torn image)
13. Global: custom cursor, `#transition-wrapper` canvas

## 5. Section-by-section

### 5.1 Preloader
- Pink full-viewport (`100svh`, `z 9999`) with the ripped-paper canvas behind.
- Content: a marquee of `hello lumos ✕` (heading-large 9.375vw, white). The track runs `marqueeAnimationPreloader 12s linear`, translating 0 -> -80vw (-180vw mobile). Each text has the `animate` attribute; the ✕ is `.marquee-icon` (6vw, 2.5vw margins).
- Timeline: wait 1.5s. SplitType into lines/words/chars. Chars `y:100%, opacity:.5 -> 0%/1`, `.5s`, ease `circ.inOut`, `stagger .1`. Icons `scale 0, rotate -45 -> 1, 0`, `.6s`, circ.inOut, at `<+0.5`. Hold 2s.
- Exit: chars `y:-100%, opacity 0`, `.55s`, stagger .1; icons `scale 0, rotate 45`, delay .8, `.6s`. 200ms later the **ripped-paper shader** wipes up (1.2s, `sine.inOut`) revealing the page.
- Scroll is locked (wheel/touch/arrow keys) during the preloader; Lenis starts after it.
- Plays once per session (`sessionStorage.animationPlayed`); otherwise the preloader is removed and the hero starts after 1s.

### 5.2 Ripped-paper shader (`test.js`, ogl)
- Fullscreen triangle, fragment shader with simplex-noise FBM (5 octaves). `uProgress` 0 -> 1 via GSAP.
- `amplitude = sin(progress * PI)`; the wipe line is `colorLimit = 1 - (progress + curve - rippedNoise - curveNoise - rippedHeight/2 * amplitude)`; `curve = amplitude * .5 * sin(uv.y * PI)`.
- Three zones: cover colour/image above the line, a **paper-texture band** (the torn fibre edge, `uRippedHeight .07`) just below it, transparent beyond.
- Defaults: color/background `#E54B8D`, `amplitude .5`, `rippedFrequency 5`, `rippedAmplitude .05`, `curveFrequency 1`, `curveAmplitude .1`, `rippedDelta 1`, `rippedHeight .07`. `dpr: 1`. The same class is also used for link-to-link page transitions (`[transition-button]`, 1.2s) and the form success.

### 5.3 Navbar
- `position:absolute` (not fixed), padding-top 2vw. Grid: logo (4.7vw) | links | actions.
- Links: Impact .83vw, `link-block` is `overflow:hidden; height:1vw`; a **clone** of the text sits at `top:100%` in pink; on hover both translate `-100%` (`.5s ease`).
- Actions: language dropdown (4.8vw black tile; **3D cube hover** with pink faces `cube-left/right/top/bottom`, `perspective 100vw`) and the **pink "Get Started" tile** (4.8vw x 5vw, Impact 1.25vw, plus icon). Both tiles slide up from `translateY(100%)` over `.8s ease-in-out` when they intersect (nav tile delayed 7s on first load, so it lands after the preloader).
- Lottie fill (`btn.json`) plays on hover over the pink tile.
- Mobile: logo fixed top-left, 17vw pink square menu button (`menu` / `close` swap), full-screen black menu, links 17.6vw.
- Navbar fades in 0.8s (+.6s delay) after the preloader.

### 5.4 Hero
- Grey, texture layers, full-height.
- **3D eyeball** (`#container.eye-block`, `height 105svh`, `scale 1.095`, `z 9999`, pointer-events none): glTF with bones; `startAnimation` rotates `model.rotation.y` to 0 over 4s `power2.inOut`, then `isPlaying`; wiggle-bone springs (`stiffness 700, damping 128`) and eye-follow of the pointer (`mouse` -1..1, inertia); env lighting; skipped below 600px, where two Lottie JSONs play (1_ then 2_ looping) with a static fallback image.
- Text block (grid, `margin-top 12vw`): `paragraph-xlarge` 4.16vw, 84% leading, width 40vw, **word-indented** (`data-indent`, first word `margin-left 12.3vw`): "We believe / there's no bad / business, **there's bad marketing**". Words slide up (see 6.3) with `data-delay` 2s, 2.25s, 2.5s, 2.75s (+8s the first time, after the preloader).
- Right block: `[lumos]` label, a **hairline** (`hero-divider`, 0.15vw, `transform-origin:100%`) animating `scaleX 0->1` over 1s (delay 1s), the "For every **business**" xlarge paragraph with a smile icon, and a right-aligned small paragraph.
- Giant ghost word `lumos` (`h1-main`): Impact 30.25vw, `-.05em`, white, `inset:auto 0 5.8vw`, behind the eye. **Fading letters**: every character gets class `animated` (`fadeInOut 2s ease-in-out infinite`, opacity .33 <-> 1) with a random `animation-delay` 1-2s, so the word shimmers unevenly.
- Bottom: QR code image + two alternating `paragraph-medium` lines "Illuminate Business Potential" / "Enhance Commercial Power". Desktop: static. **Mobile**: SplitType chars loop `y:-100%->0, hold 1.2s, ->100%`, `.2s`, stagger .02, paused when out of view.

### 5.5 Offer / about
- Hairline `lines-block` (4 lines, `height 23.4vw`, `z -1`) that **grow from the left** as they enter.
- Headline `We / offer / only / personalized / approaches` (heading-large). "We" and "approaches" are in paper white (`#ececec`, barely visible on grey) while "offer" and "personalized" are black: a low-contrast rhythm. Uses the **cube text** effect (5.7).
- `[Nothing tells us better than the numbers we have achieved]`, scrambled text (5.8), top-right absolute.
- Row: `paragraph-large` with indent (2.6vw, width 28vw, first word `margin-left 5.8vw`), left label `[about us]`.
- Three **counters** in `count-wrapper` (each 19vw wide, `overflow:hidden`): `<2M$ / 300% / 150+`, Impact 7.3vw, each digit **rolls** like a cube face (5.9). Labels `[client's profit] [roi] [completed works]` scrambled.

### 5.6 Reasons: "why we are loved"
- Black, `overflow:hidden`; glowing pink background image on top; texture layers.
- Heading `why we / are loved`: 20.83vw Impact, centered, `we` and `are` at 18% opacity (`#ececec2e`), `has--minus-margin` between lines, chars fade `opacity 0->1`, `.7s`, stagger .05 at `top 80%`. Two Lottie decorations (`wwal-lottie-1/2`) sit beside it.
- **Cards**: 8 absolutely positioned cards (17.6vw x 20vw; 32 x 36 on mobile): 5 photo cards (paper frame, photo, label + date `08.07.24`) and 5 text cards (pink / blue paper). Layout script: columns = `max(4, floor(width/(card+(-70))))`, per card random gap between `-140` and `-70` and random rotation `-20..20deg`; rows centred. Cards start `opacity 0, translateY(4vw)`, then (once, when the block enters) fade up with `1s ease`, `delay i*0.1s`.
- **Draggable** (interact.js, restricted to the parent, `endOnly`); picked card gets an incrementing `z-index`; transform keeps the card's rotation; on <=991px touch-scroll is suppressed while dragging. Cursor shows "drag".
- Bottom row: pink button "Yes, I want to talk with you!" (20vw x 5vw) + a **marquee box** (`0.2vw` paper border, `min-width 76vw`) scrolling "Do you like this approach?" in bold, `18s linear infinite` translateX 0 -> -50%.

### 5.7 Cube text (headings that roll)
- Wrap each line in `.text-line-container` (`perspective:100vw`, `preserve-3d`, `line-height 83%`) containing `.line-front` (origin top, visible) and `.line-top` (origin bottom, `rotateX(-105deg) translateY(2.5vw)`, `opacity 0`). `transition: transform .7s ease, opacity .7s ease`.
- IntersectionObserver `threshold .35`: front -> `rotateX(105deg) translateY(-2.5vw)` (fades), top -> `rotateX(0)` (appears), `index*100ms` stagger.
- Same mechanic on the **filter heading hover** (reversed) and every `.hover-animation`.

### 5.8 Scramble text
`[animatedtext]` elements, threshold .2. Each character is appended one by one every 20ms (60ms with `slow`); letters first show a random symbol from `&1$*@&#*!(^$` in **pink** and cycle 10 times at 8ms before locking to their real letter in black. Spaces/punctuation are appended instantly.

### 5.9 Digit counters
Per digit: two stacked `.digit` spans alternate; each step (300ms) shows the next number with the `cubeRotate 0.6s` keyframes (`rotateX(-105deg) translateY(2.5vw)` opacity 0 -> `rotateX(0)` opacity 1 at 50% -> `rotateX(105deg) translateY(-2.5vw)` opacity 0). Counts 0..target. First two stats random 0-300ms start; the third staggers 0/200/500ms. Non-digits (`<`, `$`, `%`, `+`) are static. Triggered at threshold .15.

### 5.10 Projects
- **Filter header**: `[ 25 ]` count + big **"All"** heading (cube text, 10.6vw mobile) + `filter projects` + a rotating arrow icon. Custom dropdown built from a hidden `<select>`: choices `All, GD, BR, SMM, SD, MA, GA, SO, WD, AD, MO` (+ subtext), each with its live count; hides empty ones. Hover: row inverts (`filter: invert(100%)`, `.3s`); arrow `rotateZ(-45deg)` and turns `#ececec`. Selecting scrolls the select into view. Supports `?category=`.
- **Rows** (`project-block`, height 4.5vw, hairline top/bottom): grid `1fr 24.2vw`; name (Impact 1.25vw), category list (bold, no caps), arrow icon.
- **Hover**: a black bar (`hover-wrap`, 120% wide, 11vw tall, margin-left -10%) rises from `top:7vw` to `-3vw` (`top .6s`, `transform .4s ease`) and **tilts** `rotateZ(((mouseX - left)/width - .5) * -10 deg)` following the pointer (rAF-throttled). On leave, resets after 200ms.
- **Open** (Webflow dropdown): black panel with a huge **name marquee** (heading-large at 18% white, `18s linear infinite` translateX 0 -> -50%, starts on hover, stops 100ms after leave) and `project-info`: image (16.5vw) + Location / Services (list with icons) / Request / **Result in pink**. Arrow rotates. Name wrapper pinned `bottom:-2px`.
- Tilt only on fine pointers.

### 5.11 Team: sticky 3D cube
- `[Who will you cooperate with?]` centered label.
- `.cube-container`: `perspective 75vw`, `height 38vw`, **sticky `top:13svh`**. Two cubes side by side, each 43vw x 38vw: cube 1 = photo faces (founder front, CEO bottom, instagram links over them), cube 2 = text faces (founder front, CEO top). As you scroll the page, the cubes rotate about X (photo rolls one way, text the other) to swap founder -> CEO. Photos are greyscale-textured; text slide is a `52.8vw x 38vw` grid: huge name (Impact), `[founder]`/`[01]`, a quote with indent, a bottom paragraph and a small signature icon. Hover on photos shows the "kadyyyrova / kondraatyuk" cursor label.
- Mobile: swiper of the same slides.
- Pink "lets talk with us!" button; torn black paper image under the section (`black-background`) leads into the reviews.

### 5.12 Reviews (3D stack)
- Heading `What people say about Lumos`, centered cube text, 4 hairlines behind.
- `relative-block` height = `slides * 40vw`; inside, a **sticky** container. Slides (40vw x 32.8vw, `perspective 73vw`) alternate `is--right` (left side) / `is--left`.
- On every scroll frame: `progress = clamp((vh - rect.top)/(vh + rect.height) - .05)`; for slide i: `end = .35 + ((n-1-i)/(n-1)) * .65`; `p = min(progress/end, 1)`; `translateZ = -40*(n-i) + (60 - (-40*(n-i))) * p` (vw); `translateX = +-9 * p` (vw, by side). Cards fly toward the viewer and fan out.
- Card: paper (torn SVG background), left column photo + name/role, right quote heading + text + service chips, **hazard-stripe** bar along the bottom. Mobile: Swiper centred slides at .9 scale with a pill pagination (active pink, 10.6vw wide).

### 5.13 Services (3D cubes)
- Black; texture; pink glow below (`pink-upsidedown`).
- Heading `services`, 20.83vw at 18% white, chars fade (triggered via `[services-trigger]` at `top 90%`).
- 4 columns (`26.6vw` tall, `perspective 100vw`, `margin-top -10vw`), each a **cube**: `service-cube-wrapper` (`translateZ(-13.3vw)`, `preserve-3d`) with `services-block` at `translateZ(13.3vw)`, `service-front` (title-only face) at `rotateX(-90deg) translateZ(13.3vw)`, and a `service-side` at `rotateY(90deg)`. Cubes roll in on scroll and **rotate on hover** to flip between the info face (title, plus icon, description, arrow, crumpled-paper overlay `mix-blend-mode:overlay`) and the title face. Colours: black, **blue** (mint), black, **pink** ("Not sure what you need?" with smile).
- Block lotties animate inside the faces. Mobile: horizontal swiper.

### 5.14 Chess CTA
- Small `[Guys, let us show us at work! ...]` paragraph with wide gaps (scrambled), 7 hairlines.
- Giant 9.375vw heading `Take the checkmate of your competitors with Lumos!` (cube text, two wrapped variants) centred.
- Behind: `chess.webp` (105.58vw wide, absolute) with a **Unicorn Studio** shader layer adding the dripping/melting pink effect (`from-unicorn`, `chess-unicorn` 105.5vw x 61vw). `has--events-none`.

### 5.15 Form (madlib)
- `Hello! I'm [name] and I'm contacting you from [company] as the [position]. My phone number is [phone] and email [email]. I'm looking to get your help with [request].` Labels are xlarge medium-weight; fields are uppercase text inputs with 3.25vw height and a 0.15vw `#191a1933` underline.
- **Scroll-scrubbed reveal** (`scrub: 4`, from `bottom bottom` to `center 35%`): words' chars fade `opacity 0 -> 1` (1s, stagger .05) spaced `0.4` apart on one timeline; each field `clip-path: inset(0 100% 0 0) -> inset(0)` (1.5s, power1.inOut) followed by its pink asterisk `scale 0 -> 1` (`back.out(1.7)`).
- Focus: `.input-border` (an animated hand-drawn line, 300% wide) gets `active`, others `inactive`; asterisk scales to .8 on focus and back on blur; placeholder fades to .4. Cursor shows "fill in".
- Validation messages: all required, email regex, phone must start with `+` and country code, request >= 2 chars (error text fades in, clears live as fields become valid).
- Submit: pink "Get in touch" tile; on success the page transition runs, the form resets after 1.4s and the success state shows `Greetings!` + confirmation.

### 5.16 Footer
- Black torn-paper image background (desktop + mobile versions); texture.
- Huge `hello lumos` (19.6vw Impact, white, `lumos` in mint, chars fade; H and L are Lottie letters).
- Nav row (link-block hover swap), `Illuminate **Your Business** Potential` (xlarge, word animation), contact grid `[email] [phone number] [social media]` with the same link hover, hairline, footer bar (`2024 / ALL RIGHTS RESERVED / PRIVACY POLICY`, `[design by]`, `[website by]`) and a **back-to-top** arrow (smooth scroll, hover opacity .5).

## 6. Global systems

### 6.1 Smooth scroll
Lenis `lerp .1`, `wheelMultiplier .7`, vertical, `smoothTouch false`; anchors and the back-to-top use smooth scroll.

### 6.2 Custom cursor (fine pointers only)
`cursor-block` follows the mouse (gsap, `.2s power2.out`) once the mouse has moved. Default cursor is a pink icon (`cursor-main`). Elements with the attribute `click`, `drag`, `next`, `prev`, `fillin` (+ person-specific ones) swap it for a **pill label** (pink bg, paper border, white text, .7vw): the pill grows its height `0 -> 1.2vw`, and its characters slide up `yPercent 100 -> 0` with stagger `.02`; leaving reverses (`.15s power1.in`) and clears the text.

### 6.3 Paragraph / heading reveals
- `[animate-p]`: SplitType lines + words; each line is `overflow:hidden`, words `y:100%, opacity 0 -> 0%/1`, `.6s power1.out`, stagger `.05`, delay from `data-delay`; `ScrollTrigger.batch` at `top 80%`. Indent handling: `has--small-indent` 5.8vw (16.8vw mobile), `data-indent` 12.3vw (24.6vw mobile), updated on resize.
- `[animate-large]` / `[animate-medium]`: chars `opacity 0 -> 1`, `.7s power1.out`, stagger .05, at `top 80%` (medium: `[services-trigger]` at `top 90%`).
- Reduced motion disables all of the above.

### 6.4 Marquees
CSS only: `marqueeAnimation 18s linear infinite` translateX 0 -> -50% on duplicated tracks (approach marquee, project name marquee on hover).

### 6.5 Page transition
`#transition-wrapper`/`#transition-canvas` covers the page; `[transition-button]` links prefetch the next page while the shader wipes in (1.2s), then navigates. On back/forward cache restore (`pageshow persisted`) it reveals instantly.

### 6.6 Responsive
Breakpoint 767px: separate `vw` scale, hero text restructured, eye replaced by Lottie/static, nav becomes a full-screen menu, services and reviews become swipers, cards re-flow to 32vw, project rows become taller stacked blocks (`dropdown-toggle-inner` 30.6vw tall, columns `1fr 1fr`).

## 7. Zocial adaptation decisions
- Same layout, vw scale, tokens, sequence, timings, easings and effects; palette and copy are Zocial's (from @thezocialmediaofficial).
- No Lumos photography, client work, QR, GLB, Lottie or shader files are reused. The eye, textures, torn edges, chess/drip visual and button fills are original.
- Real data only: 616+ Instagram followers, the 12 latest posts/reels (own images), the 6-step process from their posts. Reviews/results/case metrics are not invented; the stack section is filled from the feed and the data file is ready for real testimonials.

## 8. What was read vs inferred
- **Read directly from the site's code (exact):** all custom GSAP/Lenis/SplitType scripts, preloader timeline, shader (ogl) source, the three.js eye setup, cursor logic, counters, scramble text, cube text, card layout + drag, review-stack maths, form validation + reveal timeline, every CSS class value quoted above.
- **Inferred from CSS (not readable):** the Webflow IX2 interactions (hairline growth, team-cube rotation timing, service-cube roll-in/hover, hover-wrap tilt trigger). Their geometry is exact (the CSS transforms are quoted), their scroll ranges and easings are re-created by eye.
- **Not reproducible:** the proprietary GLB eyeball, Lottie files and Unicorn Studio scene. Those are replaced with original equivalents (see section 7).
