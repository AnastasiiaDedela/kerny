import Image from 'next/image';
import { cn } from '@/lib/utils';

const SCENE_W = 525;
const SCENE_H = 490;

const ASSETS = '/images/animated-main-img';

type Piece = { src: string; w: number; h: number };

type UnitSpec = {
  block: Piece;
  border: Piece & { dx: number; dy: number };
  ground: Piece & { dx: number; dy: number };
  bob: number;
};

const UNIT_SPECS = {
  sm: {
    block: { src: 'block-sm.svg', w: 71, h: 82 },
    border: { src: 'white-border-sm.svg', w: 76, h: 46, dx: -2.5, dy: 54 },
    ground: { src: 'ground-sm.svg', w: 71, h: 41, dx: 0, dy: 71 },
    bob: 3.6,
  },
  md: {
    block: { src: 'block-md.svg', w: 124, h: 91 },
    border: { src: 'white-border-md.svg', w: 130, h: 78, dx: -3, dy: 34 },
    ground: { src: 'ground-md.svg', w: 124, h: 72, dx: 0, dy: 54 },
    bob: 4.4,
  },
  lg: {
    block: { src: 'block-lg.svg', w: 211, h: 353 },
    border: { src: 'white-border-lg.svg', w: 210, h: 124, dx: 0.5, dy: 253 },
    ground: { src: 'ground-lg.svg', w: 205, h: 118, dx: 3, dy: 277 },
    bob: 5.6,
  },
} satisfies Record<string, UnitSpec>;

const LINK = { bob: 5.6, phase: 1.26 };

const UNITS: {
  size: keyof typeof UNIT_SPECS;
  x: number;
  y: number;
  delay: number;
  linked?: boolean;
}[] = [
  { size: 'lg', x: 158, y: 0, delay: 0, linked: true },
  { size: 'sm', x: 31, y: 139, delay: 0.18 },
  { size: 'sm', x: 426, y: 139, delay: 0.24, linked: true },
  { size: 'md', x: 4, y: 226, delay: 0.36 },
  { size: 'md', x: 398, y: 226, delay: 0.42 },
  { size: 'sm', x: 31, y: 356, delay: 0.54 },
  { size: 'sm', x: 426, y: 356, delay: 0.6 },
  { size: 'md', x: 202, y: 364, delay: 0.72 },
];

const DECOR: (Piece & { x: number; y: number; delay: number })[] = [
  { src: 'lined-4-dots.svg', w: 54, h: 38, x: 345, y: 353, delay: 0.9 },
  { src: 'grided-4-dots.svg', w: 22, h: 34, x: 133, y: 437, delay: 0.96 },
];

const CONNECTION_LINE = { src: 'connection-line.svg', w: 106, h: 64, x: 339, y: 187, delay: 0.12 };

const Z = { LINE: 1, SERVER: 2 };

const DROP_DURATION = 0.9;

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

function Part({
  src,
  w,
  h,
  x,
  y,
  delay,
  bob,
  bobDelay,
  z,
}: Piece & { x: number; y: number; delay: number; bob?: number; bobDelay?: number; z?: number }) {
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
      className="absolute"
      style={{
        left: pct(x, SCENE_W),
        top: pct(y, SCENE_H),
        width: pct(w, SCENE_W),
        zIndex: z,
      }}
    >
      {bob ? (
        <div
          className="hero-bob"
          style={{
            animationDuration: `${bob}s`,
            animationDelay: `${bobDelay ?? delay + DROP_DURATION}s`,
          }}
        >
          {drop}
        </div>
      ) : (
        drop
      )}
    </div>
  );
}

export function HeroServerScene({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Isometric illustration of a VPS server connected to distributed nodes"
      className={cn('hero-scene relative isolate', className)}
      style={{ aspectRatio: `${SCENE_W} / ${SCENE_H}` }}
    >
      <Part {...CONNECTION_LINE} bob={LINK.bob} bobDelay={LINK.phase} z={Z.LINE} />

      {UNITS.map(({ size, x, y, delay, linked }) => {
        const { block, border, ground, bob } = UNIT_SPECS[size];
        return (
          <div key={`${size}-${x}-${y}`}>
            <Part {...ground} x={x + ground.dx} y={y + ground.dy} delay={delay} />
            <Part {...border} x={x + border.dx} y={y + border.dy} delay={delay + 0.06} />
            <Part
              {...block}
              x={x}
              y={y}
              delay={delay + 0.12}
              bob={linked ? LINK.bob : bob}
              bobDelay={linked ? LINK.phase : undefined}
              z={size === 'lg' ? Z.SERVER : undefined}
            />
          </div>
        );
      })}

      {DECOR.map((piece) => (
        <Part key={piece.src} {...piece} />
      ))}
    </div>
  );
}
