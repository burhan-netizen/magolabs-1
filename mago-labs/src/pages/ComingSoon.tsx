import { Sparkles, ArrowRight, Lock, BookOpen, MessageSquareCode, Briefcase, FileText } from 'lucide-react';
import { PageId } from '../types';
import SEO from '../components/SEO';
import ClientWorkGallery from '../components/ClientWorkGallery';
import LiveMockupPlayground from '../components/LiveMockupPlayground';
import TestimonialWall from '../components/TestimonialWall';

interface ComingSoonProps {
  pageId: PageId;
  onPageChange: (page: PageId) => void;
}

export default function ComingSoon({ pageId, onPageChange }: ComingSoonProps) {
  const navigateTo = (page: PageId) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Bespoke content based on the page requested
  const getPageDetails = () => {
    switch (pageId) {
      case 'portfolio':
        return {
          title: 'Client Work',
          metaTitle: 'Our Web Design Portfolio | Mago Labs',
          metaDesc: 'See live websites Mago Labs has designed and built for real clients, from chartered accountancy firms to a solar energy distributor.',
          badge: 'Real Client Work',
          heading: 'Live sites we\u2019ve designed and built.',
          subheading: 'Click any project to preview it inline, or open it directly. These are real, live client websites, not concepts.',
          icon: Briefcase,
        };
      case 'testimonials':
        return {
          title: 'Client Reviews & Success Stories',
          metaTitle: 'Client Testimonials & Feedback | Mago Labs',
          metaDesc: 'Real feedback from real clients: chartered accountants, manufacturers, and energy businesses who trusted Mago Labs with their website.',
          badge: 'Client Success',
          heading: 'What clients say, in their own words.',
          subheading: 'No filler, no fakes, every review below is from a real client who worked with Mago Labs on their website.',
          icon: MessageSquareCode,
        };
      case 'insights':
      default:
        return {
          title: 'Digital Marketing & Growth Insights',
          metaTitle: 'Business Growth & Web Insights Blog | Mago Labs',
          metaDesc: 'Professional, jargon-free guides on search rankings, copywriting, and custom web design for business owners.',
          badge: 'Expert Editorial',
          heading: 'Plain-English guides to help your business grow.',
          subheading: 'We are writing highly strategic articles on local search optimization, conversion-focused copywriting, and web speed secrets.',
          icon: BookOpen,
        };
    }
  };

  const details = getPageDetails();
  const Icon = details.icon;

  return (
    <>
      <SEO
        title={details.metaTitle}
        description={details.metaDesc}
        path={pageId}
      />

      <section id="coming-soon-main" className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-white font-sans overflow-hidden border-b border-neutral-200/50 min-h-[80vh] flex flex-col justify-center">
        {/* Subtle grid elements */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8 max-w-4xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600">
            <Sparkles className="h-3.5 w-3.5" />
            {details.badge}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
            {details.heading}
          </h1>

          <p className="text-neutral-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {details.subheading}
          </p>

          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={() => navigateTo('contact')}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 px-8 py-4 text-sm font-bold text-white transition-all hover:translate-y-[-1px] shadow-lg shadow-blue-600/10 cursor-pointer"
            >
              Let's Discuss Your Project
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Luxury High-Fidelity Skeletal Skeletons */}
          <div className="pt-12 max-w-6xl mx-auto relative">
            {pageId !== 'portfolio' && pageId !== 'testimonials' && (
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent z-10 flex flex-col items-center justify-center gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 border border-neutral-200 text-neutral-900 shadow-md backdrop-blur-md">
                  <Lock className="h-5 w-5 animate-pulse text-blue-600" />
                </div>
                <p className="text-xs uppercase font-bold tracking-widest text-neutral-500 bg-neutral-100 px-3 py-1 rounded-md border border-neutral-200/40">
                  Curating High-End Assets: Launching Soon
                </p>
              </div>
            )}

            {/* Real Client Work for Portfolio Page */}
            {pageId === 'portfolio' && (
              <div className="space-y-16">
                <ClientWorkGallery />

                <div className="space-y-4 pt-4 border-t border-neutral-200/60">
                  <p className="text-xs font-bold font-mono tracking-widest text-neutral-400 uppercase flex items-center justify-center gap-2">
                    <span>✦ NOT YOUR INDUSTRY? TRY OUR LIVE PLAYGROUND</span>
                  </p>
                  <LiveMockupPlayground onRequestProject={() => navigateTo('contact')} />
                </div>
              </div>
            )}

            {/* Skeletons based on Page ID */}
            {pageId === 'testimonials' && <TestimonialWall />}

            {pageId === 'insights' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-45 select-none pointer-events-none blur-[2px]">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="p-6 rounded-2xl border border-neutral-200 space-y-4 text-left">
                    <div className="h-40 rounded-xl bg-neutral-100 flex items-center justify-center">
                      <FileText className="h-8 w-8 text-neutral-300" />
                    </div>
                    <div className="h-3 w-1/4 rounded bg-neutral-100" />
                    <div className="h-5 w-5/6 rounded bg-neutral-100" />
                    <div className="h-3 w-1/3 rounded bg-neutral-100" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
