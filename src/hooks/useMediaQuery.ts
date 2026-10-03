import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  // Starts false on both server and client so hydration matches; the effect below
  // sets the real value immediately after mount.
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    const updateMatch = () => setMatches(media.matches);

    // Initial check
    updateMatch();

    if (media.addEventListener) {
      media.addEventListener('change', updateMatch);
      return () => media.removeEventListener('change', updateMatch);
    } else {
      // Fallback for older browsers
      media.addListener(updateMatch);
      return () => media.removeListener(updateMatch);
    }
  }, [query]);

  return matches;
}
