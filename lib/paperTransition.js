// "Ripped paper" wipe: a GSAP-driven fragment shader (ogl). Cover colour above a noisy torn edge,
// a paper-fibre band along the tear, transparent below. Same idea as the original's TransitionInOut.
import { Renderer, Program, Mesh, Triangle, Texture, Color } from 'ogl';
import { gsap } from 'gsap';

const vertex = /* glsl */ `
attribute vec2 uv; attribute vec2 position; varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position, 0., 1.); }`;

const fragment = /* glsl */ `
precision highp float;
#define PI 3.14159265359
uniform float uProgress, uAspect, uMaxAmp, uRipFreq, uRipAmp, uCurveFreq, uCurveAmp, uRipDelta, uRipHeight;
uniform sampler2D uCover, uPaper; uniform vec3 uBg; uniform float uBgOpacity;
varying vec2 vUv;
vec3 permute(vec3 x){ return mod(((x*34.)+1.)*x, 289.); }
float snoise(vec2 v){
  const vec4 C = vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
  vec2 i = floor(v + dot(v, C.yy)); vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.,0.) : vec2(0.,1.);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1; i = mod(i, 289.);
  vec3 p = permute(permute(i.y + vec3(0., i1.y, 1.)) + i.x + vec3(0., i1.x, 1.));
  vec3 m = max(.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.); m = m*m; m = m*m;
  vec3 x = 2. * fract(p * C.www) - 1.; vec3 h = abs(x) - .5; vec3 ox = floor(x + .5); vec3 a0 = x - ox;
  m *= 1.79284291400159 - .85373472095314 * (a0*a0 + h*h);
  vec3 g; g.x = a0.x * x0.x + h.x * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130. * dot(m, g);
}
float fbm(vec2 x){
  float v = 0.; float a = .5; vec2 shift = vec2(100.);
  mat2 rot = mat2(cos(.5), sin(.5), -sin(.5), cos(.5));
  for(int i = 0; i < 5; ++i){ v += a * snoise(x); x = rot * x * 2. + shift; a *= .5; }
  return v;
}
void main(){
  vec2 auv = vUv * vec2(uAspect, 1.);
  float amp = sin(uProgress * PI);
  float curve = amp * uMaxAmp * sin(vUv.y * PI);
  float r1 = fbm(auv * uRipFreq) * uRipAmp * amp;
  float c1 = snoise((auv + vec2(-.5)) * uCurveFreq) * uCurveAmp * amp;
  float r2 = fbm((auv + vec2(uRipDelta)) * uRipFreq) * uRipAmp * amp;
  float c2 = snoise((auv + vec2(uRipDelta)) * uCurveFreq) * uCurveAmp * amp;
  float colorLimit = 1. - (uProgress + curve - r1 - c1 - ((uRipHeight * .5) * amp));
  float ripLimit   = 1. - (uProgress + curve - r2 - c2 + ((uRipHeight * .5) * amp));
  gl_FragColor = vec4(uBg, uBgOpacity);
  if(vUv.y > colorLimit){ gl_FragColor = texture2D(uCover, vUv); }
  else if(vUv.y > ripLimit){ gl_FragColor = texture2D(uPaper, auv); }
}`;

function makeCanvasTexture(gl, draw, size = 1024, repeat = false) {
  const c = document.createElement('canvas'); c.width = c.height = size;
  draw(c.getContext('2d'), size);
  return new Texture(gl, { image: c, wrapS: repeat ? gl.REPEAT : gl.CLAMP_TO_EDGE, wrapT: repeat ? gl.REPEAT : gl.CLAMP_TO_EDGE, generateMipmaps: false });
}
const grain = (ctx, s, n, alpha) => { for (let i = 0; i < n; i++) { ctx.fillStyle = `rgba(${Math.random() > .5 ? '255,255,255' : '0,0,0'},${Math.random() * alpha})`; ctx.fillRect(Math.random() * s, Math.random() * s, 1 + Math.random() * 2, 1 + Math.random() * 2); } };

export default class PaperTransition {
  constructor(canvas, { color = '#e3262e', duration = 1.2, ease = 'sine.inOut' } = {}) {
    this.canvas = canvas; this.duration = duration; this.ease = ease; this.dirty = true;
    this.renderer = new Renderer({ canvas, alpha: true, antialias: true, dpr: 1 });
    const gl = (this.gl = this.renderer.gl);
    const cover = makeCanvasTexture(gl, (ctx, s) => {
      ctx.fillStyle = color; ctx.fillRect(0, 0, s, s);
      const g = ctx.createRadialGradient(s * .3, s * .25, 10, s * .5, s * .5, s * .8);
      g.addColorStop(0, 'rgba(255,255,255,.18)'); g.addColorStop(1, 'rgba(0,0,0,.28)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, s, s); grain(ctx, s, 14000, .12);
    });
    const paper = makeCanvasTexture(gl, (ctx, s) => {
      ctx.fillStyle = '#efece6'; ctx.fillRect(0, 0, s, s); grain(ctx, s, 26000, .09);
    }, 512, true);
    this.uniforms = {
      uProgress: { value: 0 }, uAspect: { value: 1 }, uMaxAmp: { value: .5 }, uRipFreq: { value: 5 }, uRipAmp: { value: .05 },
      uCurveFreq: { value: 1 }, uCurveAmp: { value: .1 }, uRipDelta: { value: 1 }, uRipHeight: { value: .07 },
      uCover: { value: cover }, uPaper: { value: paper }, uBg: { value: new Color(color) }, uBgOpacity: { value: 0 },
    };
    this.mesh = new Mesh(gl, { geometry: new Triangle(gl), program: new Program(gl, { vertex, fragment, uniforms: this.uniforms, transparent: true }) });
    this.ro = new ResizeObserver(() => this.resize()); this.ro.observe(canvas);
    this.tick = () => { if (this.dirty) { this.renderer.render({ scene: this.mesh }); this.dirty = false; } };
    gsap.ticker.add(this.tick);
    this.resize();
  }
  resize() {
    const w = this.canvas.clientWidth || innerWidth, h = this.canvas.clientHeight || innerHeight;
    this.renderer.setSize(w, h); this.uniforms.uAspect.value = w / h; this.dirty = true;
  }
  set(v) { this.uniforms.uProgress.value = v; this.dirty = true; }
  to(value, duration = this.duration) {
    this.tl?.kill();
    return new Promise((res) => {
      this.tl = gsap.to(this.uniforms.uProgress, { value, duration, ease: this.ease, onUpdate: () => (this.dirty = true), onComplete: res });
    });
  }
  in(d) { return this.to(1, d); }
  out(d) { return this.to(0, d); }
  destroy() { gsap.ticker.remove(this.tick); this.ro.disconnect(); this.tl?.kill(); }
}
