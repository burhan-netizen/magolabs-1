import { Phone } from 'lucide-react';
import { WhatsAppLogo } from './BrandIcons';
import { motion } from 'motion/react';
import { PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ContactCTAProps {
  title?: string;
  description?: string;
  onPageChange: (page: PageId) => void;
}

export default function ContactCTA({
  title,
  description,
  onPageChange,
}: ContactCTAProps) {
  const { t } = useLanguage();
  const whatsappUrl = 'https://wa.me/919099245605?text=Hi%20Mago%20Labs%2C%20I%20would%20like%20to%20discuss%20my%20website.';
  const callUrl = 'tel:+919099245605';

  const displayTitle = title || t('cta.title');
  const displayDesc = description || t('cta.desc');

  return (
    <section id="reusable-contact-cta" className="glow-follow relative py-24 overflow-hidden bg-neutral-950 text-white font-sans">
      <div className="cta-aurora" aria-hidden="true" />
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,197,61,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute -bottom-48 -left-48 h-96 w-96 rounded-full bg-brand/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <span className="inline-flex items-center rounded-full bg-brand/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-brand border border-brand/20">
            Let&rsquo;s talk
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight">
            {displayTitle}
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDesc}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary Action */}
            <motion.button
              whileHover={{ y: -2, scale: 1.015, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
              whileTap={{ scale: 0.985, y: 0 }}
              onClick={() => {
                onPageChange('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-bold text-ink hover:bg-brand-deep shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/25 transition-all cursor-pointer"
            >
              {t('cta.btn')}
            </motion.button>

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 border border-neutral-800 px-8 py-4 text-base font-bold text-neutral-200 hover:text-white hover:bg-neutral-800 hover:border-neutral-700 transition-all hover:translate-y-[-2px] active:translate-y-0"
            >
              <WhatsAppLogo className="h-5 w-5 text-emerald-500" />
              {t('cta.whatsapp')}
            </a>
          </div>

          <p className="text-sm text-neutral-400 pt-2">
            No obligation. You talk directly to Burhan Kapasi, the founder.{' '}
            <a href={callUrl} className="font-semibold text-white underline decoration-brand decoration-2 underline-offset-4">
              Or call +91 9099245605
            </a>
          </p>

          {/* The second audience: businesses with no website yet */}
          <a
            href="/contact?start=new"
            onClick={(e) => {
              if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              window.history.pushState({}, '', '/contact?start=new');
              onPageChange('contact');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            className="inline-block text-sm font-semibold text-neutral-300 hover:text-white transition-colors underline underline-offset-4 decoration-brand decoration-2"
          >
            No website yet? Get a free website plan
          </a>
        </motion.div>
      </div>
    </section>
  );
}
