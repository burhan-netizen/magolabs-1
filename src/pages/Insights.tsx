import { motion } from 'motion/react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { PageId, BlogPostSummary } from '../types';
import { getAllPosts } from '../lib/insights';
import SEO from '../components/SEO';
import PageLink from '../components/PageLink';
import { formatPostDate } from '../lib/blogData';
import { getInsightDetailPath } from '../utils/pageRoutes';

interface InsightsProps {
  onPageChange: (page: PageId) => void;
  onOpenPost: (slug: string) => void;
}

export default function Insights({ onOpenPost }: InsightsProps) {
  // Posts come from the Markdown files in content/insights, built into the site.
  const posts: BlogPostSummary[] = getAllPosts();

  // Structured data: this page is the blog, and lists every post in it.
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://www.magolabs.in/insights#blog',
    'name': 'Mago Labs Insights',
    'url': 'https://www.magolabs.in/insights',
    'description': 'Plain-English guides on website design, local SEO and digital growth for businesses in Surat and across India.',
    'inLanguage': 'en-IN',
    'publisher': { '@id': 'https://www.magolabs.in/#localbusiness' },
    'blogPost': posts.map((post) => ({
      '@type': 'BlogPosting',
      'headline': post.title,
      'url': `https://www.magolabs.in${getInsightDetailPath(post.slug)}`,
      'datePublished': post.publishedDate
    }))
  };

  return (
    <>
      <SEO path="/insights" schemas={[blogSchema]} />

      <section id="insights-hero" className="page-hero pt-32 pb-16 sm:pt-40 sm:pb-20 font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="eyebrow">Insights</span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white leading-tight">
            Plain-English guides to help your business grow.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            Straight answers on websites, Google and getting more enquiries. Written for business owners, not developers.
          </p>
        </div>
      </section>

      <section className="pb-24 font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 && (
            <div className="text-center py-16 text-neutral-500 dark:text-neutral-400">
              <p>No posts published yet. Check back soon.</p>
            </div>
          )}

          {posts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={idx < 3 ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="h-full"
                >
                <PageLink
                  href={getInsightDetailPath(post.slug)}
                  onNavigate={() => onOpenPost(post.slug)}
                  className="h-full text-left bg-white dark:bg-[#1F1F1F] rounded-3xl border border-neutral-200/80 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-neutral-300/80 dark:hover:border-neutral-700 transition-all flex flex-col cursor-pointer"
                >
                  {post.coverImageUrl ? (
                    <img
                      src={post.coverImageUrl}
                      alt=""
                      width={1600}
                      height={900}
                      loading={idx < 3 ? 'eager' : 'lazy'}
                      fetchPriority={idx === 0 ? 'high' : undefined}
                      decoding="async"
                      className="aspect-[16/9] w-full object-cover"
                    />
                  ) : (
                    <div className="h-44 w-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-neutral-300 dark:text-neutral-600" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col gap-3 flex-grow">
                    {post.publishedDate && (
                      <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
                        {formatPostDate(post.publishedDate)}
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
                    <span className="mt-auto pt-2 inline-flex items-center gap-1.5 text-sm font-bold text-neutral-900 dark:text-brand">
                      Read more <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </PageLink>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
