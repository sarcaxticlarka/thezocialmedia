'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Hero 3D object: a glossy red "eyeball in a drip" that watches the cursor. Built procedurally with three.js.
// Timeline mirrors the original: the model starts turned away, then rotates y -> 0 over 4s (power2.inOut) once
// the intro starts, after which the pointer-follow springs take over. Skipped < 600px and for reduced motion.
export default function EyeCanvas() {
  const host = useRef(null);

  useEffect(() => {
    if (innerWidth < 600 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let disposed = false, cleanup = () => {};

    (async () => {
      const THREE = await import('three');
      const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js');
      if (disposed) return;
      const el = host.current;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.setSize(el.offsetWidth, el.offsetHeight);
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environmentIntensity = 0.95;
      const camera = new THREE.PerspectiveCamera(35, el.offsetWidth / el.offsetHeight, 0.1, 50);
      camera.position.set(0, 0, 9);
      const key = new THREE.DirectionalLight(0xffffff, 1.4); key.position.set(3, 4, 5); scene.add(key);

      const red = new THREE.MeshPhysicalMaterial({ color: 0xe3262e, roughness: 0.22, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.08 });
      const model = new THREE.Group(); scene.add(model);

      // gooey shell: a sphere nudged by low-frequency noise
      const shellGeo = new THREE.SphereGeometry(1.3, 96, 96);
      const p = shellGeo.attributes.position, v = new THREE.Vector3();
      for (let i = 0; i < p.count; i++) {
        v.fromBufferAttribute(p, i);
        const n = Math.sin(v.x * 3.1 + v.y * 2.3) * 0.035 + Math.sin(v.y * 4.7 - v.z * 3.3) * 0.025;
        v.multiplyScalar(1 + n); p.setXYZ(i, v.x, v.y, v.z);
      }
      shellGeo.computeVertexNormals();
      const shell = new THREE.Mesh(shellGeo, red); model.add(shell);

      // top bulb + neck, drip + droplet
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), red); bulb.position.set(0, 1.62, 0); model.add(bulb);
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.16, 0.5, 24), red); neck.position.set(0, 1.4, 0); model.add(neck);
      const drip = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.2, 1.7, 24), red); drip.position.set(0, -2.0, 0); model.add(drip);
      const drop = new THREE.Mesh(new THREE.SphereGeometry(0.13, 32, 32), red); drop.position.set(0, -3.0, 0); model.add(drop);
      const side = [[-1.05, -0.9, 0.3], [0.95, -1.0, 0.45], [-0.55, -1.3, 0.9]].map(([x, y, z], i) => {
        const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.06 + i * 0.01, 0.3 + i * 0.1, 8, 16), red); m.position.set(x, y, z); m.rotation.z = (i - 1) * 0.12; model.add(m); return m;
      });

      // eyelids
      const lid = new THREE.Mesh(new THREE.TorusGeometry(0.88, 0.17, 32, 96), red); lid.position.z = 0.86; lid.scale.set(1.12, 0.74, 1); model.add(lid);

      // eyeball: white sphere + iris cap + glassy cornea
      const eye = new THREE.Group(); eye.position.z = 0.72; model.add(eye);
      const ballR = 0.78;
      const sclera = document.createElement('canvas'); sclera.width = sclera.height = 512;
      const sc = sclera.getContext('2d'); sc.fillStyle = '#f4efe9'; sc.fillRect(0, 0, 512, 512);
      sc.strokeStyle = 'rgba(200,60,60,.22)'; sc.lineWidth = 1.2;
      for (let i = 0; i < 70; i++) { sc.beginPath(); let x = Math.random() * 512, y = Math.random() * 512; sc.moveTo(x, y); for (let k = 0; k < 6; k++) { x += (Math.random() - 0.5) * 40; y += (Math.random() - 0.5) * 40; sc.lineTo(x, y); } sc.stroke(); }
      const ball = new THREE.Mesh(new THREE.SphereGeometry(ballR, 64, 64), new THREE.MeshPhysicalMaterial({ map: new THREE.CanvasTexture(sclera), roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.05 })); eye.add(ball);

      const irisC = document.createElement('canvas'); irisC.width = 512; irisC.height = 256;
      const ic = irisC.getContext('2d');
      const grad = ic.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0, '#050404'); grad.addColorStop(0.36, '#0b0707'); grad.addColorStop(0.42, '#8a1d1a'); grad.addColorStop(0.62, '#e25a32'); grad.addColorStop(0.9, '#5b1010'); grad.addColorStop(1, '#1a0707');
      ic.fillStyle = grad; ic.fillRect(0, 0, 512, 256);
      for (let i = 0; i < 520; i++) { const x = Math.random() * 512; ic.strokeStyle = `rgba(${Math.random() > 0.5 ? '255,190,120' : '60,0,0'},${Math.random() * 0.25})`; ic.beginPath(); ic.moveTo(x, 256 * 0.4); ic.lineTo(x, 256 * (0.6 + Math.random() * 0.4)); ic.stroke(); }
      const capGeo = new THREE.SphereGeometry(ballR * 1.004, 64, 32, 0, Math.PI * 2, 0, 0.55); capGeo.rotateX(Math.PI / 2);
      const iris = new THREE.Mesh(capGeo, new THREE.MeshPhysicalMaterial({ map: new THREE.CanvasTexture(irisC), roughness: 0.35 })); eye.add(iris);
      const cornea = new THREE.Mesh(new THREE.SphereGeometry(ballR * 1.03, 64, 64), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.1, roughness: 0, clearcoat: 1, clearcoatRoughness: 0, envMapIntensity: 1.6 })); eye.add(cornea);

      model.position.y = 0.15;
      model.rotation.y = Math.PI * 0.9;
      let playing = false;
      const start = () => gsap.to(model.rotation, { y: 0, duration: 4, ease: 'power2.inOut', onComplete: () => (playing = true) });
      if (window.__zocialIntro) start(); else window.addEventListener('zocial:intro', start, { once: true });

      const mouse = { x: 0, y: 0 }, smooth = { x: 0, y: 0 };
      const mv = (e) => { mouse.x = (e.clientX / innerWidth - 0.5) * 2; mouse.y = -((e.clientY - el.getBoundingClientRect().top) / el.offsetHeight - 0.5) * 2; };
      window.addEventListener('mousemove', mv, { passive: true });

      let visible = true, last = performance.now();
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting)); io.observe(el);
      const wiggle = { v: 0, x: 0 };
      const tick = () => {
        if (!visible) return;
        const now = performance.now(), dt = Math.min((now - last) / 1000, 0.05); last = now;
        smooth.x += (mouse.x - smooth.x) * 0.07; smooth.y += (mouse.y - smooth.y) * 0.07;
        eye.rotation.y = smooth.x * 0.55; eye.rotation.x = -smooth.y * 0.4;
        if (playing) { model.rotation.y = smooth.x * 0.22; model.rotation.x = -smooth.y * 0.1; }
        // spring-ish wiggle on the drip (stiffness 700 / damping 128 in the original, eased here)
        const target = smooth.x * 0.25; wiggle.v += ((target - wiggle.x) * 40 - wiggle.v * 6) * dt; wiggle.x += wiggle.v * dt;
        drip.rotation.z = wiggle.x * 0.5; drop.position.x = Math.sin(wiggle.x) * 0.5 * -1 + wiggle.x * -0.1;
        const t = now / 1000; drop.position.y = -3.0 + Math.sin(t * 1.6) * 0.12; drop.scale.y = 1.25 + Math.sin(t * 1.6) * 0.18;
        side.forEach((s, i) => (s.rotation.z = (i - 1) * 0.12 + Math.sin(t + i) * 0.04));
        renderer.render(scene, camera);
      };
      gsap.ticker.add(tick);
      const onResize = () => { renderer.setSize(el.offsetWidth, el.offsetHeight); camera.aspect = el.offsetWidth / el.offsetHeight; camera.updateProjectionMatrix(); };
      window.addEventListener('resize', onResize);
      cleanup = () => {
        gsap.ticker.remove(tick); io.disconnect(); window.removeEventListener('mousemove', mv); window.removeEventListener('resize', onResize);
        window.removeEventListener('zocial:intro', start);
        renderer.dispose(); pmrem.dispose(); renderer.domElement.remove();
      };
    })();

    return () => { disposed = true; cleanup(); };
  }, []);

  return <div ref={host} id="container" className="eye-block" aria-hidden="true" />;
}
