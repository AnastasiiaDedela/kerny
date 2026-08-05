'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right' | 'up-sm';

const DIR_CLASS: Record<Direction, string> = {
  up: 'reveal-up',
  down: 'reveal-down',
  left: 'reveal-left',
  right: 'reveal-right',
  'up-sm': 'reveal-up-sm',
};

/**
 * Fades and slides its children into place when scrolled into view. Consumers
 * can stay as server components — only this wrapper is client-side. Direction
 * picks which side the content enters from; on narrow viewports the horizontal
 * directions fall back to a fade-up (see globals.css) so nothing pokes past
 * the section padding.
 */
export function Reveal({
  direction = 'up',
  delay = 0,
  className,
  threshold = 0.15,
  children,
}: {
  direction?: Direction;
  delay?: number;
  className?: string;
  threshold?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const style: CSSProperties | undefined = delay
    ? { transitionDelay: `${delay}ms` }
    : undefined;

  return (
    <div
      ref={ref}
      className={cn('reveal', DIR_CLASS[direction], visible && 'is-visible', className)}
      style={style}
    >
      {children}
    </div>
  );
}
