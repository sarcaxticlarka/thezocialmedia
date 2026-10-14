// Torn-paper curtain for the loader and the form wipe.
// A full-screen quad (ogl) with a small fragment shader of our own: value-noise displaces a horizontal edge,
// everything above the edge is the red cover, a thin strip just under it is a paper lip, the rest is clear.
// GSAP drives `uP` from 0 (clear) to 1 (covered).
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl';
import { gsap } from 'gsap';

const vertex = /* glsl */ `
attribute vec2 uv; attribute vec2 position; varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position, 0., 1.); }`;

const fragment = /* glsl */ `
precision highp float;
uniform float uP;          // 0 = nothing covered, 1 = fully covered
uniform float uAsp;        // canvas aspect ratio
uniform sampler2D uCover;  // cover artwork
uniform sampler2D uLip;    // paper fibre texture
varying vec2 vUv;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), f.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), f.x), f.y);
}
float fbm(vec2 p){ float a = .5, v = 0.; for (int i = 0; i < 4; i++){ v += a * vnoise(p); p = p * 2.03 + 17.; a *= .5; } return v; }

void main(){
  vec2 q = vUv * vec2(uAsp, 1.);
  // jagged edge: slow wobble + fine tearing, strongest mid-transition
  float wob = (fbm(q * vec2(2.4, 5.) + uP * .6) - .5) * .24 + (fbm(q * 11.) - .5) * .05;
  float edge = 1.12 - uP * 1.32 + wob;                       // cover occupies y > edge
  float lip  = edge - .03 - (fbm(q * 16. + 3.) - .5) * .035;  // paper lip sits just below it
  if (vUv.y > edge)      gl_FragColor = texture2D(uCover, vUv);
  else if (vUv.y > lip)  gl_FragColor = texture2D(uLip, q);
  else                   gl_FragColor = vec4(0.);
}`;

function canvasTexture(gl, draw, size, repeat) {
  const c = document.createElement('canvas'); c.width = c.height = size;
  draw(c.getContext('2d'), size);
  const w = repeat ? gl.REPEAT : gl.CLAMP_TO_EDGE;
  return new Texture(gl, { image: c, wrapS: w, wrapT: w, generateMipmaps: false });
}
const speckle = (ctx, s, n, a) => { for (let i = 0; i < n; i++) { ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '255,255,255' : '0,0,0'},${Math.random() * a})`; ctx.fillRect(Math.random() * s, Math.random() * s, 1 + Math.random() * 2, 1 + Math.random() * 2); } };

export default class PaperTransition {
  constructor(canvas, { color = '#e3262e', duration = 0.9, ease = 'sine.inOut' } = {}) {
    this.canvas = canvas; this.duration = duration; this.ease = ease; this.dirty = true;
    this.renderer = new Renderer({ canvas, alpha: true, antialias: false, dpr: 1 });
    const gl = (this.gl = this.renderer.gl);
    const cover = canvasTexture(gl, (ctx, s) => {
      ctx.fillStyle = color; ctx.fillRect(0, 0, s, s);
      const g = ctx.createRadialGradient(s * 0.3, s * 0.25, 10, s * 0.5, s * 0.5, s * 0.8);
      g.addColorStop(0, 'rgba(255,255,255,.16)'); g.addColorStop(1, 'rgba(0,0,0,.3)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, s, s); speckle(ctx, s, 9000, 0.12);
    }, 512, false);
    const lip = canvasTexture(gl, (ctx, s) => { ctx.fillStyle = '#efece6'; ctx.fillRect(0, 0, s, s); speckle(ctx, s, 12000, 0.1); }, 256, true);
    this.uniforms = { uP: { value: 0 }, uAsp: { value: 1 }, uCover: { value: cover }, uLip: { value: lip } };
    this.mesh = new Mesh(gl, { geometry: new Triangle(gl), program: new Program(gl, { vertex, fragment, uniforms: this.uniforms, transparent: true }) });
    this.onResize = () => this.resize(); window.addEventListener('resize', this.onResize);
    this.tick = () => { if (this.dirty) { this.renderer.render({ scene: this.mesh }); this.dirty = false; } };
    gsap.ticker.add(this.tick);
    this.resize();
  }
  resize() { const w = innerWidth, h = innerHeight; this.renderer.setSize(w, h); this.uniforms.uAsp.value = w / h; this.dirty = true; }
  set(v) { this.uniforms.uP.value = v; this.dirty = true; }
  to(value, duration = this.duration) {
    this.tl?.kill();
    return new Promise((res) => { this.tl = gsap.to(this.uniforms.uP, { value, duration, ease: this.ease, onUpdate: () => (this.dirty = true), onComplete: res }); });
  }
  in(d) { return this.to(1, d); }
  out(d) { return this.to(0, d); }
  destroy() { gsap.ticker.remove(this.tick); window.removeEventListener('resize', this.onResize); this.tl?.kill(); }
}
