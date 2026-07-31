import { Home, ArrowRight, Search, Briefcase, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import { updateDocumentSEO } from '../utils/seo';
import { useEffect } from 'react';

interface NotFoundProps {
  onPageChange: (page: PageId) => void;
}

export default function NotFound({ onPageChange }: NotFoundProps) {
  // App.tsx's global effect already calls updateDocumentSEO(currentPage) on every page
  // change, but this page can also be reached directly (a stale/broken URL on first
  // load) before that effect's dependency changes, so it sets its own SEO/noindex too.
  useEffect(() => {
    updateDocumentSEO('not-found');
  }, []);

  const suggestions = [
    { label: 'Go to Homepage', page: 'home' as PageId, icon: Home, desc: 'Start fresh from the beginning.' },
    { label: 'Browse Our Services', page: 'services' as PageId, icon: Briefcase, desc: 'See what we can build for you.' },
    { label: 'View Our Work', page: 'work' as PageId, icon: Search, desc: 'See the design work taking shape.' },
    { label: 'Contact Us', page: 'contact' as PageId, icon: MessageSquare, desc: 'Have a question? Just ask.' },
  ];

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-white dark:bg-[#1A1A1A] font-sans overflow-hidden py-24 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#2d2d2d_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      <div className="relative z-10 mx-auto max-w-2xl text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <span className="text-7xl sm:text-8xl font-black tracking-tighter text-neutral-200 dark:text-neutral-800 block">
            404
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            This page doesn&apos;t exist
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
            The link you followed may be broken, or the page may have moved. Let&apos;s get you back on track.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left"
        >
          {suggestions.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.page}
                onClick={() => onPageChange(item.page)}
                className="group flex items-center gap-3 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-blue-300 dark:hover:border-blue-800 hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-all cursor-pointer"
              >
                <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-grow min-w-0">
                  <span className="text-xs font-bold text-neutral-900 dark:text-white block">{item.label}</span>
                  <span className="text-[10px] text-neutral-400 dark:text-neutral-500 block truncate">{item.desc}</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-300 dark:text-neutral-700 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
