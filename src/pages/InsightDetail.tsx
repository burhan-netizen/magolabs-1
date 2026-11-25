import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';
import { PageId, BlogPost } from '../types';
import { getPostBySlug, getAllPosts, absoluteUrl } from '../lib/insights';
import { WhatsAppLogo } from '../components/BrandIcons';
import { WHATSAPP_URL } from '../utils/contactLinks';
import { updateDocumentSEO, insightPageTitle, metaDescription } from '../utils/seo';
import { getInsightDetailPath } from '../utils/pageRoutes';
import { getInitialBlogData, formatPostDate } from '../lib/blogData';
import JsonLd from '../components/JsonLd';

interface InsightDetailProps {
  slug: string | null;
  onPageChange: (page: PageId) => void;
}

export default function InsightDetail({ slug, onPageChange }: InsightDetailProps) {
  // A post that existed when the site was built is already in the page, text and
  // all. Anything newer is fetched in the browser.
  const builtPost = getInitialBlogData()?.post;
  const initialPost = builtPost && builtPost.slug === slug ? builtPost : null;
  const [post, setPost] = useState<BlogPost | null>(initialPost);
  const [status, setStatus] = useState<'loading' | 'ready' | 'not-found' | 'error'>(initialPost ? 'ready' : 'loading');

  useEffect(() => {
    if (!slug) {
      setStatus('not-found');
      return;
    }
    if (initialPost) return;
    let cancelled = false;
    setStatus('loading');
    getPostBySlug(slug)
      .then((data) => {
        if (cancelled) return;
        if (!data) {
          setStatus('not-found');
          return;
        }
        setPost(data);
        setStatus('ready');
      })
      .catch(() => {
        if (cancelled) return;
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (status === 'ready' && post) {
      updateDocumentSEO(
        'insights-detail',
        insightPageTitle(post.title),
        metaDescription(post.excerpt),
        absoluteUrl(post.coverImageUrl),
        getInsightDetailPath(post.slug)
      );
    }
  }, [status, post]);

  // Structured data for the article, rendered as markup so it ships in the HTML.
  const articleSchema = post
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: absoluteUrl(post.coverImageUrl),
        author: post.author
          ? { '@type': 'Person', name: post.author, url: 'https://www.magolabs.in/about' }
          : { '@id': 'https://www.magolabs.in/#founder' },
        datePublished: post.publishedDate,
        dateModified: post.publishedDate,
        inLanguage: 'en',
        mainEntityOfPage: `https://www.magolabs.in${getInsightDetailPath(post.slug)}`,
        publisher: {
          '@type': 'Organization',
          '@id': 'https://www.magolabs.in/#localbusiness',
          name: 'Mago Labs',
          logo: { '@type': 'ImageObject', url: 'https://www.magolabs.in/logo.png' },
        },
      }
    : null;

  const backToInsights = () => {
    onPageChange('insights');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (status === 'loading') {
    return (
      <section className="pt-32 pb-24 font-sans">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 animate-pulse space-y-6">
          <div className="h-4 w-24 rounded bg-neutral-100 dark:bg-neutral-800" />
          <div className="h-10 w-3/4 rounded bg-neutral-100 dark:bg-neutral-800" />
          <div className="h-64 w-full rounded-2xl bg-neutral-100 dark:bg-neutral-800" />
          <div className="h-4 w-full rounded bg-neutral-100 dark:bg-neutral-800" />
          <div className="h-4 w-full rounded bg-neutral-100 dark:bg-neutral-800" />
          <div className="h-4 w-2/3 rounded bg-neutral-100 dark:bg-neutral-800" />
        </div>
      </section>
    );
  }

  if (status === 'not-found' || status === 'error' || !post) {
    return (
      <section className="pt-32 pb-24 font-sans">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center flex flex-col items-center gap-4">
          <AlertCircle className="h-8 w-8 text-neutral-400" />
          <h1 className="text-2xl font-extrabold text-neutral-900 dark:text-white">
            {status === 'error' ? "Couldn't load this post" : 'Post not found'}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            {status === 'error'
              ? 'Please try again shortly.'
              : "This post may have been unpublished or the link is incorrect."}
          </p>
          <button
            onClick={backToInsights}
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-neutral-900 hover:bg-neutral-800 px-6 py-3 text-sm font-bold text-white transition-all"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Insights
          </button>
        </div>
      </section>
    );
  }

  // A rough reading time from the body text.
  const words = post.bodyHtml.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(2, Math.round(words / 220));

  // Related guides: the posts sharing the most words with this one's address, newest first.
  const keywords = new Set(post.slug.split('-').filter((w) => w.length > 3));
  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: p.slug.split('-').filter((w) => keywords.has(w)).length }))
    .sort((x, y) => y.score - x.score)
    .slice(0, 3)
    .map((r) => r.p);

  const openPost = (slugToOpen: string) => {
    window.history.pushState({}, '', getInsightDetailPath(slugToOpen));
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <article className="font-sans">
      {articleSchema && <JsonLd data={articleSchema} />}

      {/* Opening: the question, big, on dark */}
      <header className="relative bg-neutral-950 text-white pt-32 md:pt-40 pb-[14vw] lg:pb-56 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(180deg,#000_0%,#000_55%,transparent_100%)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={backToInsights}
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> All guides
          </button>

          <h1 className="mt-8 text-[clamp(2.2rem,5vw,4.25rem)] font-bold leading-[1.02] text-white">
            {post.title}
          </h1>
          {post.excerpt && <p className="mt-6 max-w-3xl text-lg sm:text-xl leading-relaxed text-neutral-300">{post.excerpt}</p>}

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-neutral-400">
            <span className="inline-flex items-center gap-3">
              <img src="/founder/portrait.webp" alt="" width={1100} height={1258} className="h-10 w-10 rounded-full object-cover object-[50%_20%] ring-2 ring-white/10" />
              <span>
                <span className="block font-semibold text-white">{post.author ?? 'Burhan Kapasi'}</span>
                <span className="block text-xs">Founder, Mago Labs</span>
              </span>
            </span>
            {post.publishedDate && <span>{formatPostDate(post.publishedDate)}</span>}
            <span>{minutes} min read</span>
          </div>
        </div>
      </header>

      <div className="bg-neutral-50 pb-24">
        {post.coverImageUrl && (
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <img
              src={post.coverImageUrl}
              alt=""
              width={1600}
              height={900}
              className="-mt-[11vw] lg:-mt-44 block w-full aspect-[16/9] rounded-[20px] sm:rounded-[28px] object-cover ring-1 ring-black/10 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.55)]"
            />
          </div>
        )}

        {/* Post body is the post's Markdown file (content/insights), turned into HTML by
            scripts/build-insights.ts. Only add posts you have written or checked. */}
        <div
          className="insight-body mx-auto mt-16 max-w-[44rem] px-4 sm:px-6 text-neutral-700 dark:text-neutral-300"
          dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
        />

        {/* Who wrote it, and the next step that fits a reader who got this far */}
        <aside className="mx-auto mt-20 max-w-[44rem] px-4 sm:px-6">
          <div className="flex flex-col gap-6 rounded-[24px] bg-neutral-950 p-7 text-white sm:flex-row sm:items-center sm:p-9">
            <img src="/founder/portrait.webp" alt="Burhan Kapasi" width={1100} height={1258} className="h-20 w-20 shrink-0 rounded-full object-cover object-[50%_20%]" />
            <div className="flex-1">
              <p className="font-display text-xl font-semibold tracking-tight">Want me to look at your website?</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                I'm Burhan, founder of Mago Labs. Send me your website and I'll tell you, in plain English, what is stopping visitors from calling. Free, no obligation.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-5">
                <button
                  onClick={() => {
                    onPageChange('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-ink hover:bg-brand-deep transition-colors cursor-pointer"
                >
                  Get a free website audit <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold underline decoration-white/30 decoration-2 underline-offset-4 hover:decoration-brand"
                >
                  <WhatsAppLogo className="h-4 w-4 text-emerald-400" /> WhatsApp me
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* More guides */}
        {related.length > 0 && (
          <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="related-title">
            <div className="flex items-end justify-between gap-6">
              <h2 id="related-title" className="text-3xl sm:text-4xl font-bold text-neutral-950">Keep reading</h2>
              <button onClick={backToInsights} className="group inline-flex items-center gap-2 font-semibold text-neutral-900 underline decoration-brand decoration-2 underline-offset-4 cursor-pointer">
                All guides <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
              {related.map((r) => (
                <a
                  key={r.slug}
                  href={getInsightDetailPath(r.slug)}
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                    e.preventDefault();
                    openPost(r.slug);
                  }}
                  className="group block"
                >
                  {r.coverImageUrl && (
                    <span className="block overflow-hidden rounded-[18px] ring-1 ring-black/10">
                      <img src={r.coverImageUrl} alt="" width={1600} height={900} loading="lazy" className="block aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    </span>
                  )}
                  <span className="mt-4 block font-display text-lg font-semibold leading-snug tracking-tight text-neutral-950 group-hover:underline decoration-brand decoration-2 underline-offset-4">
                    {r.title}
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
