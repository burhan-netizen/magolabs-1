import { useEffect, useState } from 'react';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { PageId, BlogPost } from '../types';
import { getPostBySlug } from '../lib/contentful';
import { updateDocumentSEO } from '../utils/seo';
import { getInsightDetailPath } from '../utils/pageRoutes';

interface InsightDetailProps {
  slug: string | null;
  onPageChange: (page: PageId) => void;
}

function formatDate(iso: string): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function InsightDetail({ slug, onPageChange }: InsightDetailProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'not-found' | 'error'>('loading');

  useEffect(() => {
    if (!slug) {
      setStatus('not-found');
      return;
    }
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
        `${post.title} | Mago Labs Insights`,
        post.excerpt,
        post.coverImageUrl,
        getInsightDetailPath(post.slug)
      );

      const scriptId = 'json-ld-schema-script';
      document.querySelectorAll(`script[id="${scriptId}"]`).forEach((s) => s.remove());
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: post.coverImageUrl,
        author: post.author ? { '@type': 'Person', name: post.author } : undefined,
        datePublished: post.publishedDate,
        publisher: { '@type': 'Organization', name: 'Mago Labs' },
      };
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = scriptId;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);

      return () => {
        document.querySelectorAll(`script[id="${scriptId}"]`).forEach((s) => s.remove());
      };
    }
  }, [status, post]);

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

  return (
    <article className="pt-32 pb-24 font-sans">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <button
          onClick={backToInsights}
          className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Insights
        </button>

        <div className="space-y-3 mb-8">
          {post.publishedDate && (
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
              {formatDate(post.publishedDate)}
              {post.author ? ` \u00b7 ${post.author}` : ''}
            </span>
          )}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white leading-tight">
            {post.title}
          </h1>
        </div>

        {post.coverImageUrl && (
          <img
            src={post.coverImageUrl}
            alt=""
            className="w-full rounded-3xl mb-10 object-cover max-h-[420px]"
          />
        )}

        {/* Post body comes from Contentful's rich text, converted to sanitized-by-structure HTML
            in src/lib/contentful.ts. Only trusted editors should have publish access. */}
        <div
          className="insight-body text-neutral-700 dark:text-neutral-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
        />
      </div>
    </article>
  );
}
