import { useEffect, useRef } from 'react';

interface BgVideoProps {
  /** Base name in /public/media: loads `name.mp4`, `name-m.mp4` on phones and `name-poster.webp`. */
  name: string;
  className?: string;
}

/**
 * A silent background loop. The poster image shows straight away; the video file is
 * only fetched when the section comes near the screen, plays while it is visible and
 * pauses when it is not. Visitors who ask for reduced motion or less data keep the
 * still image.
 */
export default function BgVideo({ name, className = '' }: BgVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;

    const small = window.matchMedia('(max-width: 767px)').matches;
    let loaded = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!loaded) {
            video.src = `/media/${name}${small ? '-m' : ''}.mp4`;
            loaded = true;
          }
          video.play().catch(() => {});
        } else if (loaded) {
          video.pause();
        }
      },
      { rootMargin: '300px 0px' }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [name]);

  return (
    <video
      ref={ref}
      className={`pointer-events-none select-none object-cover ${className}`}
      poster={`/media/${name}-poster.webp`}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
