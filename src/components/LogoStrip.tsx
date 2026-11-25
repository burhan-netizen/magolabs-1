import { LOGOS, WALL_VERSION } from './LogoWall';

/**
 * A slim, slow strip of client logos in one soft white tone, for the bottom of the
 * homepage hero. The list is drawn twice so the loop has no seam; the second copy is
 * hidden from screen readers. It pauses on hover, and stands still with reduced motion.
 */
export default function LogoStrip() {
  return (
    <div className="logo-strip relative overflow-hidden" aria-label="Some of our clients">
      <div className="logo-strip-track flex w-max items-center gap-14 pr-14">
        {[0, 1].map((copy) =>
          LOGOS.map((logo) => (
            <img
              key={`${logo.file}-${copy}`}
              src={`/logos/wall/${logo.file}.webp?v=${WALL_VERSION}`}
              alt={copy === 0 ? logo.name : ''}
              aria-hidden={copy === 1 ? true : undefined}
              width={logo.width}
              height={logo.height}
              loading="lazy"
              decoding="async"
              style={{ height: Math.round(logo.h * 0.62) }}
              className="w-auto shrink-0 select-none opacity-60 [filter:brightness(0)_invert(1)] transition-opacity hover:opacity-100"
            />
          ))
        )}
      </div>
    </div>
  );
}
