declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends a GA4 event via the gtag.js snippet in index.html. Safe to call even when gtag
 * isn't present (ad blockers, the localhost/prerender guard in index.html skipping
 * initialization, or the script failing to load) - it just no-ops instead of throwing,
 * since a tracking failure should never break the actual user action it's attached to.
 */
export function trackEvent(name: string, params?: Record<string, string | number | boolean>): void {
  try {
    window.gtag?.('event', name, params);
  } catch {
    // Analytics must never be able to break the click/submit it's attached to.
  }
}
