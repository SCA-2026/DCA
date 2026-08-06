"use client";

import { useEffect, useRef, type ReactNode } from "react";

export type ParallaxEase = "in" | "out";
export type ZoomMode = "in" | "out";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t: number) {
  return t * t * t;
}

function applyEase(t: number, ease: ParallaxEase) {
  const x = Math.min(1, Math.max(0, t));
  return ease === "in" ? easeInCubic(x) : easeOutCubic(x);
}

function viewportProgress(rect: DOMRect, view: number) {
  const mid = rect.top + rect.height / 2;
  const start = view + rect.height * 0.35;
  const end = -rect.height * 0.35;
  const raw = (start - mid) / (start - end);
  return Math.min(1, Math.max(0, raw));
}

/**
 * Gentle alternating parallax. Keep motion subtle so content stays readable.
 */
export function ParallaxBand({
  children,
  className = "",
  amount = 36,
  ease = "out",
  zoom = "in",
  direction = 1,
  fade = false,
  scale: _scale,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  ease?: ParallaxEase;
  zoom?: ZoomMode;
  direction?: 1 | -1;
  fade?: boolean;
  /** @deprecated Use `zoom` instead */
  scale?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.transform = "none";
      el.style.opacity = "1";
      return;
    }

    let frame = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const p = viewportProgress(rect, view);
      const fromCenter = Math.abs(p - 0.5) * 2;
      const nearCenter = 1 - fromCenter;

      const ySign = p < 0.5 ? 1 : -1;
      const y =
        ySign *
        direction *
        Math.min(amount, 48) *
        applyEase(fromCenter, ease) *
        0.55;

      let scaleValue = 1;
      if (zoom === "in") {
        scaleValue = 1.04 - 0.04 * applyEase(nearCenter, ease);
      } else {
        scaleValue = 0.97 + 0.03 * applyEase(nearCenter, ease);
      }

      let opacity = 1;
      if (fade) {
        opacity = 0.82 + applyEase(nearCenter, "out") * 0.18;
      }

      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scaleValue.toFixed(4)})`;
      el.style.opacity = opacity.toFixed(3);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [amount, ease, zoom, direction, fade]);

  return (
    <div ref={ref} className={`origin-center will-change-transform ${className}`}>
      {children}
    </div>
  );
}

export function ScrollDrift({
  children,
  className = "",
  amount = 24,
  ease = "out",
  zoom = "in",
  direction = 1,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  ease?: ParallaxEase;
  zoom?: ZoomMode;
  direction?: 1 | -1;
}) {
  return (
    <ParallaxBand
      className={className}
      amount={amount}
      ease={ease}
      zoom={zoom}
      direction={direction}
      fade={false}
    >
      {children}
    </ParallaxBand>
  );
}
