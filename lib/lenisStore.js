import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
let instance = null;

// Same settings as the original: lerp .1, wheelMultiplier .7, vertical, no smooth touch.
export function ensureLenis() {
  if (typeof window === 'undefined') return null;
  if (!instance) {
    instance = new Lenis({ lerp: 0.1, wheelMultiplier: 0.7, gestureOrientation: 'vertical', syncTouch: false });
    instance.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => instance.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  return instance;
}
export const getLenis = () => instance;
export function scrollToTarget(target, opts = {}) {
  const l = ensureLenis();
  l.scrollTo(target, { duration: 1.4, ...opts });
}
