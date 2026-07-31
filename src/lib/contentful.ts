// This package ships both an ESM build (named export) and a CJS build (default export
// wrapping the same named export), and different tools resolve to different ones ,
// Vite's bundler picks the ESM build, while Node's native loader (used when this file
// runs under `tsx` for the build-time prerender script) picks the CJS build. A namespace
// import works with both: it exposes the named export directly on the ESM build, and
// synthesizes it from `.default` on the CJS build.
import * as contentfulHtmlRenderer from '@contentful/rich-text-html-renderer';
const documentToHtmlString: typeof import('@contentful/rich-text-html-renderer').documentToHtmlString =
  (contentfulHtmlRenderer as { documentToHtmlString?: typeof import('@contentful/rich-text-html-renderer').documentToHtmlString }).documentToHtmlString
    ?? (contentfulHtmlRenderer as unknown as { default: { documentToHtmlString: typeof import('@contentful/rich-text-html-renderer').documentToHtmlString } }).default.documentToHtmlString;
import { BLOCKS } from '@contentful/rich-text-types';
import { BlogPost, BlogPostSummary } from '../types';

/**
 * Reads a Contentful env var in whichever environment we're running in:
 * - Browser bundle / `vite build`: Vite injects these onto `import.meta.env`.
 * - `scripts/prerender-seo.ts` (run directly via `tsx`, not through Vite): falls back
 *   to `process.env`, populated by `dotenv.config()` at the top of that script.
 */
function getEnvVar(key: string): string | undefined {
  const viteEnv = (import.meta as unknown as { env?: Record<string, string | undefined> })?.env;
  if (viteEnv && viteEnv[key]) return viteEnv[key];
  if (typeof process !== 'undefined' && process.env && process.env[key]) return process.env[key];
  return undefined;
}

function getSpaceId(): string | undefined {
  return getEnvVar('VITE_CONTENTFUL_SPACE_ID');
}
function getAccessToken(): string | undefined {
  return getEnvVar('VITE_CONTENTFUL_ACCESS_TOKEN');
}
function getEnvironment(): string {
  return getEnvVar('VITE_CONTENTFUL_ENVIRONMENT') || 'master';
}

const CDA_BASE = 'https://cdn.contentful.com';

/** True once both required env vars are present. Read lazily (not cached at module-load
 *  time) so it reflects env vars loaded by dotenv *after* this module was imported ,
 *  ES module imports are hoisted and evaluate before the importer's own top-level code,
 *  so a top-level dotenv.config() call in a script that imports this module would
 *  otherwise always run too late. */
export function isContentfulConfigured(): boolean {
  return Boolean(getSpaceId() && getAccessToken());
}

interface ContentfulAsset {
  sys: { id: string };
  fields: { file?: { url?: string } };
}

interface ContentfulEntry {
  sys: { id: string };
  fields: Record<string, unknown>;
}

interface ContentfulResponse {
  items: ContentfulEntry[];
  includes?: { Asset?: ContentfulAsset[] };
}

function assetUrl(assetId: string | undefined, includes?: ContentfulResponse['includes']): string | undefined {
  if (!assetId || !includes?.Asset) return undefined;
  const asset = includes.Asset.find((a) => a.sys.id === assetId);
  const url = asset?.fields?.file?.url;
  if (!url) return undefined;
  return url.startsWith('//') ? `https:${url}` : url;
}

function toSummary(entry: ContentfulEntry, includes?: ContentfulResponse['includes']): BlogPostSummary {
  const fields = entry.fields as {
    title?: string;
    slug?: string;
    excerpt?: string;
    author?: string;
    publishedDate?: string;
    coverImage?: { sys?: { id?: string } };
  };
  const coverAssetId = fields.coverImage?.sys?.id;

  return {
    id: entry.sys.id,
    title: fields.title ?? 'Untitled post',
    slug: fields.slug ?? entry.sys.id,
    excerpt: fields.excerpt ?? '',
    author: fields.author,
    publishedDate: fields.publishedDate ?? '',
    coverImageUrl: assetUrl(coverAssetId, includes),
  };
}

async function fetchFromContentful(query: string): Promise<ContentfulResponse> {
  const spaceId = getSpaceId();
  const accessToken = getAccessToken();
  if (!spaceId || !accessToken) {
    throw new Error('Contentful is not configured: missing VITE_CONTENTFUL_SPACE_ID / VITE_CONTENTFUL_ACCESS_TOKEN.');
  }
  const url = `${CDA_BASE}/spaces/${spaceId}/environments/${getEnvironment()}/entries?content_type=blogPost&access_token=${accessToken}&${query}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Contentful request failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

/** All published posts, newest first, for the Insights listing page. */
export async function getAllPosts(): Promise<BlogPostSummary[]> {
  const data = await fetchFromContentful('order=-fields.publishedDate&include=2');
  return data.items.map((entry) => toSummary(entry, data.includes));
}

/** A single post (with rendered HTML body) by its slug, for the Insights detail page. */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const data = await fetchFromContentful(
    `fields.slug=${encodeURIComponent(slug)}&include=2&limit=1`
  );
  const entry = data.items[0];
  if (!entry) return null;

  const summary = toSummary(entry, data.includes);
  const bodyDocument = (entry.fields as { body?: unknown }).body;

  const bodyHtml = bodyDocument
    ? documentToHtmlString(bodyDocument as never, {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: (node) => {
            const assetId = (node as { data?: { target?: { sys?: { id?: string } } } })?.data?.target?.sys?.id;
            const url = assetUrl(assetId, data.includes);
            return url ? `<img src="${url}" alt="" loading="lazy" />` : '';
          },
        },
      })
    : '';

  return { ...summary, bodyHtml };
}
