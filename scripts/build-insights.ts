/**
 * Turns the blog posts in content/insights/*.md into the data the site uses.
 *
 * Each post is a Markdown file with a small header (frontmatter):
 *
 *   ---
 *   title: "Post title"
 *   slug: "post-address"            (the page lives at /insights/post-address)
 *   excerpt: "One or two sentences for the card and Google."
 *   author: "Burhan Kapasi"
 *   publishedDate: "2026-11-02T00:00+05:30"
 *   coverImage: "/images/insights/post-address.webp"   (file in public/images/insights/)
 *   draft: true                     (optional: hides the post)
 *   ---
 *   The post itself, in Markdown.
 *
 * Writes two generated outputs (both git-ignored, rebuilt on every dev and build run):
 * - src/data/insights.generated.json: the post list (no bodies), used by the Insights page.
 * - public/insights-data/<slug>.json: each full post, loaded when a reader opens it
 *   without a page reload, and read by scripts/prerender-seo.ts to write each post page.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import type { BlogPost, BlogPostSummary } from '../src/types';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content', 'insights');
const listPath = path.join(root, 'src', 'data', 'insights.generated.json');
const postsDir = path.join(root, 'public', 'insights-data');

const SLUG = /^[a-z0-9-]+$/;

/** Reads the header block. Values are JSON strings, or plain text, or true/false. */
function parseFrontmatter(raw: string, file: string): { data: Record<string, string | boolean>; body: string } {
	const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
	if (!match) throw new Error(`${file}: missing the --- header block at the top.`);
	const data: Record<string, string | boolean> = {};
	for (const line of match[1].split(/\r?\n/)) {
		if (!line.trim() || line.trim().startsWith('#')) continue;
		const i = line.indexOf(':');
		if (i === -1) throw new Error(`${file}: can't read header line "${line}".`);
		const key = line.slice(0, i).trim();
		const value = line.slice(i + 1).trim();
		if (value === 'true' || value === 'false') data[key] = value === 'true';
		else if (value.startsWith('"')) data[key] = JSON.parse(value);
		else data[key] = value.replace(/^'(.*)'$/, '$1');
	}
	return { data, body: match[2] };
}

const posts: BlogPost[] = [];
for (const name of fs.readdirSync(contentDir).filter((f) => f.endsWith('.md')).sort()) {
	const file = path.join('content', 'insights', name);
	const { data, body } = parseFrontmatter(fs.readFileSync(path.join(contentDir, name), 'utf-8'), file);
	if (data.draft === true) continue;
	const slug = String(data.slug || name.replace(/\.md$/, ''));
	for (const key of ['title', 'publishedDate'] as const) {
		if (!data[key]) throw new Error(`${file}: "${key}" is required.`);
	}
	if (!SLUG.test(slug)) throw new Error(`${file}: slug "${slug}" may only use lowercase letters, numbers and dashes.`);
	if (Number.isNaN(new Date(String(data.publishedDate)).getTime())) throw new Error(`${file}: publishedDate "${data.publishedDate}" is not a valid date.`);
	const cover = data.coverImage ? String(data.coverImage) : undefined;
	if (cover && cover.startsWith('/') && !fs.existsSync(path.join(root, 'public', cover))) {
		throw new Error(`${file}: cover image ${cover} is not in public/.`);
	}
	if (posts.some((p) => p.slug === slug)) throw new Error(`${file}: another post already uses the slug "${slug}".`);
	posts.push({
		id: slug,
		slug,
		title: String(data.title),
		excerpt: String(data.excerpt ?? ''),
		author: data.author ? String(data.author) : undefined,
		publishedDate: String(data.publishedDate),
		coverImageUrl: cover,
		bodyHtml: marked.parse(body, { async: false }) as string,
	});
}

// Newest first, matching the order the Insights page has always used.
posts.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime() || a.slug.localeCompare(b.slug));

fs.mkdirSync(path.dirname(listPath), { recursive: true });
const list: BlogPostSummary[] = posts.map(({ bodyHtml: _body, ...summary }) => summary);
fs.writeFileSync(listPath, JSON.stringify(list, null, '\t') + '\n');

fs.rmSync(postsDir, { recursive: true, force: true });
fs.mkdirSync(postsDir, { recursive: true });
for (const post of posts) fs.writeFileSync(path.join(postsDir, `${post.slug}.json`), JSON.stringify(post));

console.log(`[build-insights] ${posts.length} post(s) ready from content/insights.`);
