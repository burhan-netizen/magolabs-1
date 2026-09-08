import { PageId } from '../types';
import { CASE_STUDY_IDS } from '../data/caseStudies';

/**
 * Single source of truth mapping every real, fixed page to a real, crawlable URL path.
 * `not-found` is excluded since it has no real routed path of its own, it's what
 * any *unmatched* path resolves to. `insights-detail` and `work-detail` are excluded
 * because neither is one fixed path , each is a family of paths (one per blog post
 * slug, one per case-study id respectively , see below).
 */
export const PAGE_TO_PATH: Record<Exclude<PageId, 'not-found' | 'insights-detail' | 'work-detail'>, string> = {
  home: '/',
  about: '/about',
  services: '/services',
  'service-web-design': '/services/web-design',
  'service-seo': '/services/seo',
  'service-gbp': '/services/google-business-profile',
  'service-copywriting': '/services/copywriting',
  work: '/work',
  insights: '/insights',
  contact: '/contact',
  sitemap: '/sitemap',
  privacy: '/privacy',
  terms: '/terms',
};

const PATH_TO_PAGE: Record<string, PageId> = Object.entries(PAGE_TO_PATH).reduce(
  (acc, [pageId, path]) => {
    acc[path] = pageId as PageId;
    return acc;
  },
  {} as Record<string, PageId>
);

/** Matches "/insights/some-post-slug" (but not bare "/insights"). */
const INSIGHT_DETAIL_PATTERN = /^\/insights\/([a-z0-9-]+)$/;

/** Matches "/work/some-case-study-id" (but not bare "/work"). Unlike blog posts
 *  (managed externally in Contentful, so any slug-shaped path is provisionally
 *  "known"), case studies are a small, local, static list - so a path is only
 *  treated as known if it names a real case study, and a typo'd URL correctly
 *  404s instead of rendering a fake page. */
const WORK_DETAIL_PATTERN = /^\/work\/([a-z0-9-]+)$/;

/** Whether a given pathname matches one of the app's real, known routes. */
export function isKnownPath(pathname: string): boolean {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return (
    normalized in PATH_TO_PAGE ||
    INSIGHT_DETAIL_PATTERN.test(normalized) ||
    getWorkSlugFromPath(normalized) !== null
  );
}

/** Resolve a browser pathname (e.g. "/services/seo") to a known PageId, or 'not-found'
 *  for anything that doesn't match a real route, a genuine 404, not a silent home fallback. */
export function getPageFromPath(pathname: string): PageId {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (normalized in PATH_TO_PAGE) return PATH_TO_PAGE[normalized];
  if (INSIGHT_DETAIL_PATTERN.test(normalized)) return 'insights-detail';
  if (getWorkSlugFromPath(normalized) !== null) return 'work-detail';
  return 'not-found';
}

/** Extracts the post slug from a pathname like "/insights/my-post", or null if it isn't one. */
export function getInsightSlugFromPath(pathname: string): string | null {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const match = normalized.match(INSIGHT_DETAIL_PATTERN);
  return match ? match[1] : null;
}

/** Builds the URL path for a given post slug. */
export function getInsightDetailPath(slug: string): string {
  return `/insights/${slug}`;
}

/** Extracts the case-study id from a pathname like "/work/santoshtimbers", validated
 *  against the real, known case studies - returns null for both non-matching shapes
 *  and typo'd/unknown ids. */
export function getWorkSlugFromPath(pathname: string): string | null {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const match = normalized.match(WORK_DETAIL_PATTERN);
  if (!match) return null;
  return CASE_STUDY_IDS.includes(match[1]) ? match[1] : null;
}

/** Builds the URL path for a given case-study id. */
export function getWorkDetailPath(id: string): string {
  return `/work/${id}`;
}

/** Resolve a PageId to its real URL path. For 'insights-detail'/'work-detail' (neither has
 *  a single fixed path) this falls back to their listing page , callers that need a specific
 *  post/case-study's URL should use getInsightDetailPath(slug)/getWorkDetailPath(id) instead. */
export function getPathFromPage(pageId: PageId): string {
  if (pageId === 'not-found') return '/404';
  if (pageId === 'insights-detail') return PAGE_TO_PATH.insights;
  if (pageId === 'work-detail') return PAGE_TO_PATH.work;
  return PAGE_TO_PATH[pageId] ?? '/';
}
