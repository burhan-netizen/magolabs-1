import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, ArrowRight, AlertCircle } from 'lucide-react';
import { PageId, BlogPostSummary } from '../types';
import { getAllPosts, isContentfulConfigured } from '../lib/contentful';
import SEO from '../components/SEO';

interface InsightsProps {
  onPageChange: (page: PageId) => void;
  onOpenPost: (slug: string) => void;
}

function formatDate(iso: string): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function Insights({ onOpenPost }: InsightsProps) {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error' | 'unconfigured'>('loading');

  useEffect(() => {
    if (!isContentfulConfigured()) {
      setStatus('unconfigured');
      return;
    }
    let cancelled = false;
    getAllPosts()
      .then((data) => {
        if (cancelled) return;
        setPosts(data);
        setStatus('ready');
      })
      .catch(() => {
        if (cancelled) return;
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <SEO
        title="Digital Growth, SEO & Web Design Insights | Mago Labs"
        description="Get direct, jargon-free marketing guides, web performance strategies, and local SEO advice to grow your business online."
        path="/insights"
      />

      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 dark:bg-blue-500/10 dark:border-blue-500/20 px-4 py-1.5 text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-widest">
            <BookOpen className="h-3.5 w-3.5" />
            Insights
          </div>
          <h1 className="mt-6 text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white leading-tight">
            Plain-English guides to help your business grow.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            Strategic, jargon-free articles on local search optimization, conversion-focused copywriting, and web speed.
          </p>
        </div>
      </section>

      <section className="pb-24 font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {status === 'loading' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className="animate-pulse rounded-3xl border border-neutral-200/80 dark:border-neutral-800 p-6 space-y-4">
                  <div className="h-40 rounded-2xl bg-neutral-100 dark:bg-neutral-800" />
                  <div className="h-4 w-2/3 rounded bg-neutral-100 dark:bg-neutral-800" />
                  <div className="h-4 w-full rounded bg-neutral-100 dark:bg-neutral-800" />
                </div>
              ))}
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center text-center gap-3 py-16 text-neutral-500 dark:text-neutral-400">
              <AlertCircle className="h-8 w-8" />
              <p>Couldn't load posts right now. Please try again shortly.</p>
            </div>
          )}

          {status === 'unconfigured' && (
            <div className="flex flex-col items-center text-center gap-3 py-16 text-neutral-500 dark:text-neutral-400">
              <AlertCircle className="h-8 w-8" />
              <p>Blog isn't connected yet \u2014 add your Contentful credentials to see posts here.</p>
            </div>
          )}

          {status === 'ready' && posts.length === 0 && (
            <div className="text-center py-16 text-neutral-500 dark:text-neutral-400">
              <p>No posts published yet. Check back soon.</p>
            </div>
          )}

          {status === 'ready' && posts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, idx) => (
                <motion.button
                  key={post.id}
                  onClick={() => onOpenPost(post.slug)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="text-left bg-white dark:bg-[#1F1F1F] rounded-3xl border border-neutral-200/80 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-neutral-300/80 dark:hover:border-neutral-700 transition-all flex flex-col cursor-pointer"
                >
                  {post.coverImageUrl ? (
                    <img
                      src={post.coverImageUrl}
                      alt=""
                      loading="lazy"
                      className="h-44 w-full object-cover"
                    />
                  ) : (
                    <div className="h-44 w-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-neutral-300 dark:text-neutral-600" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col gap-3 flex-grow">
                    {post.publishedDate && (
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                        {formatDate(post.publishedDate)}
                      </span>
                    )}
                    <h2 className="text-lg font-extrabold text-neutral-900 dark:text-white leading-snug">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="mt-auto pt-2 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400">
                      Read more <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
