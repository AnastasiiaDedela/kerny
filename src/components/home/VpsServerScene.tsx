'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const SCENE_W = 358;
const SCENE_H = 276;

const ASSETS = '/images/secondary-hero';

const PARTS: {
  src: string;
  w: number;
  h: number;
  x: number;
  y: number;
  delay: number;
  bob?: boolean;
}[] = [
  { src: 'ground.svg', w: 358, h: 208, x: 0, y: 68.5, delay: 0 },
  { src: 'white-border.svg', w: 340, h: 200, x: 9, y: 48.5, delay: 0.06 },
  { src: 'bottom-block.svg', w: 206, h: 153, x: 76, y: 58.5, delay: 0.12, bob: true },
  { src: 'top-block.svg', w: 206, h: 153, x: 76, y: 0, delay: 0.24, bob: true },
];

const DROP_DURATION = 0.9;
const BOB_DURATION = 5;

const BOB_DELAY = PARTS[PARTS.length - 1].delay + DROP_DURATION;

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

export function VpsServerScene({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setPlayed(true);
        observer.disconnect();
      },
      { threshold: 0.33 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Isometric illustration of a VPS server node"
      className={cn('hero-scene relative isolate', !played && 'hero-scene--idle', className)}
      style={{ aspectRatio: `${SCENE_W} / ${SCENE_H}` }}
    >
      {PARTS.map(({ src, w, h, x, y, delay, bob }) => {
        const drop = (
          <Image
            src={`${ASSETS}/${src}`}
            alt=""
            width={w}
            height={h}
            unoptimized
            loading="eager"
            className="hero-drop block h-auto w-full"
            style={{ animationDelay: `${delay}s` }}
          />
        );

        return (
          <div
            key={src}
            className="absolute"
            style={{ left: pct(x, SCENE_W), top: pct(y, SCENE_H), width: pct(w, SCENE_W) }}
          >
            {bob ? (
              <div
                className="hero-bob"
                style={{
                  animationDuration: `${BOB_DURATION}s`,
                  animationDelay: `${BOB_DELAY}s`,
                }}
              >
                {drop}
              </div>
            ) : (
              drop
            )}
          </div>
        );
      })}
    </div>
  );
}
