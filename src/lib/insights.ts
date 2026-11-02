import { BlogPost, BlogPostSummary } from '../types';
import postList from '../data/insights.generated.json';

/**
 * Blog posts live as Markdown files in content/insights/ and are turned into data by
 * scripts/build-insights.ts on every dev and build run. See that script for the format.
 */

const SITE_URL = 'https://www.magolabs.in';

/** All published posts, newest first, for the Insights listing page. */
export function getAllPosts(): BlogPostSummary[] {
  return postList as BlogPostSummary[];
}

/** A single post with its body, for when a reader opens a post without a page reload.
 *  (Pages loaded directly already have the post written into them at build time.) */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!getAllPosts().some((p) => p.slug === slug)) return null;
  const res = await fetch(`/insights-data/${encodeURIComponent(slug)}.json`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Could not load post: ${res.status}`);
  return (await res.json()) as BlogPost;
}

/** Social previews and structured data need a full address for images. */
export function absoluteUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  return url.startsWith('/') ? `${SITE_URL}${url}` : url;
}
