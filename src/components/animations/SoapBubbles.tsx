import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ─────────────────────────────────────────────────────────────────────────────
// Realistic soap bubble – iridescent thin-film shader
// Rendered with a raw Three.js WebGLRenderer (no react-three-fiber overhead).
// ─────────────────────────────────────────────────────────────────────────────

// ── Vertex shader ──
const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vPosition;
  varying vec2 vUv;

  uniform float uTime;
  uniform float uJiggle;   // per-bubble jiggle phase seed

  // Smooth deformation: squash / stretch driven by a low-freq sine
  void main() {
    vUv       = uv;
    vNormal   = normalize(normalMatrix * normal);

    // Soft squash-stretch along Y
    float t     = uTime * 0.6 + uJiggle;
    float squash = 1.0 + 0.035 * sin(t * 1.7)  * cos(t * 0.9);
    float stretch= 1.0 - 0.025 * sin(t * 1.3);

    vec3 pos    = position;
    pos.y      *= squash;
    pos.xz     *= stretch;

    vec4 worldPos  = modelMatrix * vec4(pos, 1.0);
    vPosition      = worldPos.xyz;

    vec4 mvPos     = viewMatrix * worldPos;
    vViewDir       = normalize(-mvPos.xyz);

    gl_Position    = projectionMatrix * mvPos;
  }
`;

// ── Fragment shader (thin-film iridescence) ──
const fragmentShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vPosition;
  varying vec2 vUv;

  uniform float uTime;
  uniform float uColorShift;  // per-bubble hue offset

  // ── Helpers ──────────────────────────────────────────────────────────────
  // Convert hue [0-1] → rgb (full saturation, luminance 0.5)
  vec3 hue2rgb(float h) {
    h = fract(h);
    float r = abs(h * 6.0 - 3.0) - 1.0;
    float g = 2.0 - abs(h * 6.0 - 2.0);
    float b = 2.0 - abs(h * 6.0 - 4.0);
    return clamp(vec3(r, g, b), 0.0, 1.0);
  }

  // Thin-film iridescence: interference colour based on viewing angle
  vec3 thinFilm(float cosTheta) {
    // Optical path difference changes with angle (soap film physics)
    float opd  = (1.0 - cosTheta * cosTheta);          // 0..1
    float shift = uColorShift + uTime * 0.04;

    // Three interference orders → rich rainbow
    vec3 col  = hue2rgb(opd * 0.60 + shift);
    col      += hue2rgb(opd * 0.40 + shift + 0.33) * 0.6;
    col      += hue2rgb(opd * 0.80 + shift + 0.66) * 0.4;
    col      /= 2.0;

    return col;
  }

  void main() {
    vec3 N      = normalize(vNormal);
    vec3 V      = normalize(vViewDir);
    float cosT  = max(dot(N, V), 0.0);

    // ── Fresnel ──────────────────────────────────────────────────────────
    // Soap bubble is almost perfectly transparent at centre, opaque at rim
    float fresnel = pow(1.0 - cosT, 3.5);
    fresnel       = clamp(fresnel, 0.0, 1.0);

    // Edge softening: fade out very extreme rim pixels
    float edgeFade = smoothstep(0.0, 0.18, cosT);

    // ── Iridescent surface colour ─────────────────────────────────────────
    vec3 iridescentColor = thinFilm(cosT);
    // Boost saturation and brightness slightly
    iridescentColor = mix(vec3(dot(iridescentColor, vec3(0.333))), iridescentColor, 1.8);
    iridescentColor = clamp(iridescentColor * 1.3, 0.0, 1.0);

    // ── Primary specular highlight (white glint top-left) ─────────────────
    vec3 lightDir = normalize(vec3(-0.6, 0.9, 0.8));
    float spec1   = pow(max(dot(reflect(-lightDir, N), V), 0.0), 80.0);
    vec3 highlight1 = vec3(1.0) * spec1 * 2.5;

    // ── Secondary softer highlight (bottom-right) ─────────────────────────
    vec3 lightDir2 = normalize(vec3(0.5, -0.4, 0.7));
    float spec2    = pow(max(dot(reflect(-lightDir2, N), V), 0.0), 30.0);
    vec3 highlight2 = vec3(0.9, 0.95, 1.0) * spec2 * 0.7;

    // ── Small twin-glint dots (like the reference image) ──────────────────
    vec3 glintDir = normalize(vec3(-0.3, 0.7, 1.0));
    float glint   = pow(max(dot(reflect(-glintDir, N), V), 0.0), 200.0);
    vec3 glints   = vec3(1.0) * glint * 4.0;

    // ── Compose colour ────────────────────────────────────────────────────
    vec3 color = iridescentColor * fresnel * 0.85;
    color     += highlight1 + highlight2 + glints;

    // ── Alpha ─────────────────────────────────────────────────────────────
    // Mostly transparent at centre, more opaque at rim
    float alpha = fresnel * 0.88 + spec1 * 0.9 + spec2 * 0.4 + glint;
    alpha      *= edgeFade;
    alpha       = clamp(alpha, 0.0, 0.95);

    gl_FragColor = vec4(color, alpha);
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Bubble data structure
// ─────────────────────────────────────────────────────────────────────────────
interface BubbleState {
  mesh: THREE.Mesh;
  uniforms: Record<string, THREE.IUniform>;
  x: number;          // current world X
  y: number;          // current world Y
  z: number;          // depth
  radius: number;
  speedX: number;     // horizontal drift speed
  speedY: number;     // upward float speed
  jiggle: number;     // phase offset for deformation
  colorShift: number; // per-bubble hue
  wrapY: number;      // Y at which to reset to bottom
}

export interface SoapBubblesProps {
  count?: number;       // number of bubbles (3-6 recommended)
  className?: string;
}

export function SoapBubbles({ count = 5, className = '' }: SoapBubblesProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,       // transparent canvas background
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);   // fully transparent
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ────────────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const aspect = mount.clientWidth / mount.clientHeight;
    const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 100);
    camera.position.z = 6;

    // ── Shared geometry (reused across all bubbles) ───────────────────────
    const geometry = new THREE.SphereGeometry(1, 96, 96);

    // ── Helper: world visible bounds at z=0 ──────────────────────────────
    const getVisibleBounds = () => {
      const fovRad   = (camera.fov * Math.PI) / 180;
      const height   = 2 * Math.tan(fovRad / 2) * camera.position.z;
      const width    = height * (mount.clientWidth / mount.clientHeight);
      return { hw: width / 2, hh: height / 2 };
    };

    // ── Create bubbles ────────────────────────────────────────────────────
    const { hw, hh } = getVisibleBounds();
    const bubbles: BubbleState[] = [];

    for (let i = 0; i < count; i++) {
      const colorShift = i / count;
      const jiggle     = (i * 2.399) % (Math.PI * 2); // golden-angle spread
      const radius     = 0.45 + Math.random() * 0.65;

      const uniforms: Record<string, THREE.IUniform> = {
        uTime:       { value: 0 },
        uJiggle:     { value: jiggle },
        uColorShift: { value: colorShift },
      };

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        depthWrite:  false,
        blending:    THREE.NormalBlending,
        side:        THREE.FrontSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.setScalar(radius);

      // Spread initially across the entire visible height so there's always a
      // bubble visible on every section — not just at the bottom.
      const x = (Math.random() - 0.5) * hw * 2 * 0.9;
      const y = (Math.random() - 0.5) * hh * 2;   // random across full height
      const z = (Math.random() - 0.5) * 1.5;

      mesh.position.set(x, y, z);
      scene.add(mesh);

      bubbles.push({
        mesh,
        uniforms,
        x, y, z,
        radius,
        speedX:     (Math.random() - 0.5) * 0.005,
        speedY:     0.009 + Math.random() * 0.009,
        jiggle,
        colorShift,
        wrapY:      hh + radius + 0.5,
      });
    }

    // ── Animation loop ────────────────────────────────────────────────────
    let rafId: number;
    let lastTime = performance.now();

    const animate = () => {
      rafId = requestAnimationFrame(animate);

      const now   = performance.now();
      const delta = (now - lastTime) / 1000;   // seconds
      lastTime    = now;

      const { hw: vhw, hh: vhh } = getVisibleBounds();

      for (const b of bubbles) {
        // Update uniform time (per-bubble so jiggle phase differs)
        b.uniforms.uTime.value += delta;

        // Drift + float
        b.x += b.speedX + Math.sin(b.uniforms.uTime.value * 0.4 + b.jiggle) * 0.0015;
        b.y += b.speedY;

        // Wrap around: when bubble exits top, reset to below bottom
        if (b.y > vhh + b.radius + 0.5) {
          b.y      = -vhh - b.radius - 0.2;
          b.x      = (Math.random() - 0.5) * vhw * 2 * 0.85;
        }

        // Horizontal soft bounce near edges
        if (b.x < -vhw + b.radius) { b.x = -vhw + b.radius; b.speedX *= -1; }
        if (b.x >  vhw - b.radius) { b.x =  vhw - b.radius; b.speedX *= -1; }

        b.mesh.position.set(b.x, b.y, b.z);
      }

      renderer.render(scene, camera);
    };

    animate();

    // ── Resize handler ────────────────────────────────────────────────────
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      bubbles.forEach((b) => {
        b.mesh.geometry.dispose();
        (b.mesh.material as THREE.ShaderMaterial).dispose();
      });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [count]);

  return (
    <div
      ref={mountRef}
      className={`pointer-events-none overflow-hidden ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
