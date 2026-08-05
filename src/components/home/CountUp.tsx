'use client';

import { useEffect, useState } from 'react';

/* Groups thousands with a non-breaking space ("15 465") so the number never
   wraps mid-digit. */
function format(value: number) {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/* Fast out of the gate, long tail — the last digits settle instead of stopping
   dead on the target. */
function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

type CountUpProps = {
  value: number;
  duration?: number;
  className?: string;
};

export function CountUp({ value, duration = 2000, className }: CountUpProps) {
  /* Server and client both render 0, so the first paint is already the start of
     the count — no flash of the final number before hydration rewinds it. */
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame = 0;

    /* Reduced motion: jump straight to the target instead of counting. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      frame = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(frame);
    }

    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(value * easeOutExpo(progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return <span className={className}>{format(display)}</span>;
}
