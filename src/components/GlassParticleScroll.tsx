"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  ox: number;
  oy: number;
  r: number;
  phase: number;
  cr: number;
  cg: number;
  cb: number;
};

type Target = {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
};

async function loadLogo(): Promise<HTMLImageElement> {
  const img = new Image();
  img.src = "/decentrix-logo.png";
  img.decoding = "async";
  await img.decode();
  return img;
}

/** Sample visible pixels from the uploaded logo as particle targets. */
function sampleLogoTargets(
  width: number,
  height: number,
  logo: HTMLImageElement,
): { targets: Target[]; logoRect: { dx: number; dy: number; dw: number; dh: number } } {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    return { targets: [], logoRect: { dx: 0, dy: 0, dw: 0, dh: 0 } };
  }

  ctx.clearRect(0, 0, width, height);

  const maxW = width * 0.78;
  const maxH = height * 0.48;
  const scale = Math.min(maxW / logo.naturalWidth, maxH / logo.naturalHeight);
  const dw = logo.naturalWidth * scale;
  const dh = logo.naturalHeight * scale;
  const dx = (width - dw) / 2;
  const dy = (height - dh) / 2 - height * 0.02;
  const logoRect = { dx, dy, dw, dh };

  ctx.drawImage(logo, dx, dy, dw, dh);

  const { data } = ctx.getImageData(0, 0, width, height);
  const points: Target[] = [];
  // Dense sampling so the settled mark reads as one clear logo, not sparse pieces
  const step = Math.max(2, Math.floor(Math.min(width, height) / 240));

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const i = (y * width + x) * 4;
      const a = data[i + 3];
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const lum = r + g + b;
      if (a < 40) continue;
      if (lum < 12 && a < 180) continue;

      // Light mode: keep black wordmark dark; keep X gradient colors as-sampled
      const isDarkInk = lum < 90;
      points.push({
        x: x + (Math.random() - 0.5) * step * 0.2,
        y: y + (Math.random() - 0.5) * step * 0.2,
        r: isDarkInk ? 22 : r,
        g: isDarkInk ? 12 : g,
        b: isDarkInk ? 40 : b,
      });
    }
  }

  return { targets: points, logoRect };
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function GlassParticleScroll({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const logoRectRef = useRef({ dx: 0, dy: 0, dw: 0, dh: 0 });
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const reducedRef = useRef(false);
  const logoRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    reducedRef.current =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canvas = canvasRef.current;
    const pin = pinRef.current;
    const root = rootRef.current;
    const formZone = formRef.current;
    if (!canvas || !pin || !root || !formZone) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;

    const rebuild = async () => {
      if (!logoRef.current) {
        logoRef.current = await loadLogo();
      }
      const logo = logoRef.current;

      const rect = pin.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(window.innerHeight));
      sizeRef.current = { w, h, dpr };

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const { targets, logoRect } = sampleLogoTargets(w, h, logo);
      logoRectRef.current = logoRect;
      if (targets.length === 0) return;

      const count = Math.min(targets.length, 3200);
      const particles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const t = targets[i % targets.length];
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.max(w, h) * (0.35 + Math.random() * 0.7);
        const ox = w * 0.5 + Math.cos(angle) * dist;
        const oy = h * 0.5 + Math.sin(angle) * dist;
        particles.push({
          x: ox,
          y: oy,
          ox,
          oy,
          tx: t.x,
          ty: t.y,
          r: 0.85 + Math.random() * 1.6,
          phase: Math.random() * Math.PI * 2,
          cr: t.r,
          cg: t.g,
          cb: t.b,
        });
      }

      particlesRef.current = particles;
    };

    const onScroll = () => {
      if (reducedRef.current) {
        progressRef.current = 1;
        return;
      }
      const formHeight = Math.max(1, formZone.offsetHeight - window.innerHeight);
      const formTop = formZone.getBoundingClientRect().top;
      const scrolled = Math.min(Math.max(-formTop, 0), formHeight);
      progressRef.current = formHeight > 0 ? scrolled / formHeight : 1;
    };

    const drawParticle = (
      x: number,
      y: number,
      r: number,
      formed: number,
      time: number,
      phase: number,
      cr: number,
      cg: number,
      cb: number,
    ) => {
      const shimmer = 0.55 + Math.sin(time * 0.002 + phase) * 0.18;
      const alpha = 0.22 + formed * 0.68 * shimmer;

      const br = Math.round(255 * (1 - formed) + cr * formed);
      const bg = Math.round(255 * (1 - formed) + cg * formed);
      const bb = Math.round(255 * (1 - formed) + cb * formed);

      const g = ctx.createRadialGradient(
        x - r * 0.35,
        y - r * 0.45,
        r * 0.08,
        x,
        y,
        r * 1.45,
      );
      g.addColorStop(0, `rgba(255, 255, 255, ${0.7 * alpha})`);
      g.addColorStop(0.4, `rgba(${br}, ${bg}, ${bb}, ${0.7 * alpha})`);
      g.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);

      ctx.beginPath();
      ctx.fillStyle = g;
      ctx.arc(x, y, r * 1.35, 0, Math.PI * 2);
      ctx.fill();
    };

    const tick = (time: number) => {
      if (!running) return;
      const { w, h } = sizeRef.current;
      const p = particlesRef.current;
      const raw = progressRef.current;
      const form = easeInOutCubic(Math.min(1, Math.max(0, raw)));
      const settle = form * form;
      // After particles lock, fade in the crisp uploaded logo
      const logoReveal = Math.max(0, (form - 0.78) / 0.22);

      ctx.clearRect(0, 0, w, h);

      const field = ctx.createRadialGradient(
        w * 0.5,
        h * 0.48,
        Math.min(w, h) * 0.08,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.7,
      );
      field.addColorStop(0, `rgba(255, 45, 149, ${0.05 + form * 0.08})`);
      field.addColorStop(0.45, `rgba(168, 85, 247, ${0.04 + form * 0.07})`);
      field.addColorStop(1, "rgba(247, 244, 252, 0)");
      ctx.fillStyle = field;
      ctx.fillRect(0, 0, w, h);

      const particleAlpha = 1 - logoReveal * 0.92;
      ctx.save();
      ctx.globalAlpha = particleAlpha;
      for (const particle of p) {
        const driftX =
          Math.sin(time * 0.0007 + particle.phase) * (1 - settle) * 22;
        const driftY =
          Math.cos(time * 0.0009 + particle.phase) * (1 - settle) * 16;
        const x = particle.ox + (particle.tx - particle.ox) * form + driftX;
        const y = particle.oy + (particle.ty - particle.oy) * form + driftY;
        particle.x = x;
        particle.y = y;
        drawParticle(
          x,
          y,
          particle.r,
          form,
          time,
          particle.phase,
          particle.cr,
          particle.cg,
          particle.cb,
        );
      }
      ctx.restore();

      const logo = logoRef.current;
      const lr = logoRectRef.current;
      if (logo && logoReveal > 0 && lr.dw > 0) {
        ctx.save();
        ctx.globalAlpha = logoReveal;
        ctx.drawImage(logo, lr.dx, lr.dy, lr.dw, lr.dh);
        ctx.restore();
      }

      ctx.save();
      ctx.globalAlpha = 0.3 + form * 0.4;
      ctx.fillStyle = "#7d7494";
      ctx.font = '500 10px "JetBrains Mono", monospace';
      ctx.textAlign = "center";
      ctx.fillText(
        form < 0.98
          ? `${Math.round(form * 100)}% assembled`
          : "logo formed · keep scrolling",
        w * 0.5,
        h * 0.92,
      );
      ctx.restore();

      raf = requestAnimationFrame(tick);
    };

    void rebuild().then(() => {
      onScroll();
      raf = requestAnimationFrame(tick);
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => {
      void rebuild();
    };
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative"
      aria-label="Decentrix Africa logo forming in glass particles"
    >
      <div
        ref={pinRef}
        className="sticky top-0 z-0 h-dvh w-full overflow-hidden bg-[var(--ink)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--magenta)_18%,transparent),var(--ink)_72%)]" />
        <canvas ref={canvasRef} className="relative z-[1] h-full w-full" />
        <p className="pointer-events-none absolute bottom-8 left-1/2 z-[2] -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--fog)]">
          Scroll — particles form the logo
        </p>
      </div>

      <div className="relative z-10 -mt-[100dvh]">
        <div ref={formRef} className="h-[280vh]" aria-hidden />
        <div className="relative">{children}</div>
      </div>
    </section>
  );
}
