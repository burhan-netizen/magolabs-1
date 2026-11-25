import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { PageId } from '../types';
import SEO from '../components/SEO';
import { LeadMode } from '../components/LeadForm';
import HomeTop from '../components/home/HomeTop';
import ServicesPick from '../components/home/v3/ServicesPick';
import WorkDeck from '../components/home/v3/WorkDeck';
import BuiltFor from '../components/home/v3/BuiltFor';
import ProcessCards from '../components/home/v3/ProcessCards';
import UsVsThem from '../components/home/v3/UsVsThem';
import FounderSoul from '../components/home/v3/FounderSoul';
import ClientWords from '../components/home/v3/ClientWords';
import Closing from '../components/home/v3/Closing';

interface HomeProps {
  onPageChange: (page: PageId) => void;
  onOpenCaseStudy: (id: string) => void;
}

/* ---------------------------------------------------------------------------
   Homepage, November 2026 revamp.
   The page tells one story in the customer's order: the promise, their problem,
   what we do, the work, the results, what clients say, who is behind it, then
   their next step. Copy lives here or in the section components as plain data.
--------------------------------------------------------------------------- */

const FAQS = [
  {
    question: 'What does the free audit include?',
    answer: 'Burhan reviews your website himself: how it looks, how fast it loads, how easy it is to contact you, and how you show up on Google. You get a short, plain-English summary of what to fix first. There is no charge and no obligation.',
  },
  {
    question: 'I don’t have a website yet. Where do I start?',
    answer: 'Ask for a free website plan. Tell us what your business does, and Burhan will send you a short plan: the pages you need, what they should say, and how customers will find you. Several of our clients, including a CA firm that went on to sign 34 new clients, started with no website at all.',
  },
  {
    question: 'How long does a website take to build?',
    answer: 'It depends on the package. A Launch website is live in 5 days, Growth in 14 days, Scale in 21 days, and an online store in 28 days.',
  },
  {
    question: 'How much does a custom website cost?',
    answer: 'There are four packages, and the pricing page lists what each one includes and its starting price. You get a clear, fixed quote before any work starts. No hidden fees: hosting is included, and you keep full ownership of your domain and code.',
  },
  {
    question: 'Will my website rank on Google?',
    answer: 'Every site we build is set up to rank: clean structure, proper headings, local schema markup and fast load times. Pair that with a well-run Google Business Profile and you give yourself the best chance. Nobody can honestly promise a specific position.',
  },
  {
    question: 'Can I edit the website myself later?',
    answer: 'Yes. We set up simple content controls so you can change text, prices and photos in a couple of minutes, without touching code.',
  },
  {
    question: 'What happens after launch?',
    answer: 'We don’t disappear. Content changes, security updates and new features are a WhatsApp message or a call away.',
  },
];

export default function Home({ onPageChange, onOpenCaseStudy }: HomeProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const toggleFaq = (idx: number) => setOpenFaq(openFaq === idx ? null : idx);

  const navigateTo = (page: PageId) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const goToAudit = () => navigateTo('contact');

  // Which starting point the form on this page shows. The "no website yet" buttons
  // switch it and bring the form into view, so the visitor never leaves the page.
  const [leadMode, setLeadMode] = useState<LeadMode>('audit');

  // Structured data: the business, the organisation, and the FAQ on this page.
  const homeSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'ProfessionalService'],
      'name': 'Mago Labs',
      'description': 'Website design and development company in Surat, Gujarat. Custom, hand-coded websites, local SEO and Google Business Profile optimisation for small and mid-sized businesses.',
      'image': 'https://www.magolabs.in/logo.png',
      'logo': 'https://www.magolabs.in/logo.png',
      '@id': 'https://www.magolabs.in/#localbusiness',
      'url': 'https://www.magolabs.in',
      'telephone': '+91 9099245605',
      'email': 'burhan@magolabs.in',
      'priceRange': '₹₹',
      'foundingDate': '2024',
      'founder': {
        '@type': 'Person',
        'name': 'Burhan Kapasi',
        'url': 'https://www.magolabs.in/about',
        'sameAs': ['https://www.linkedin.com/in/burhanuddinkapasi/']
      },
      'areaServed': [
        { '@type': 'City', 'name': 'Surat' },
        { '@type': 'State', 'name': 'Gujarat' },
        { '@type': 'Country', 'name': 'India' }
      ],
      'knowsAbout': ['Website design', 'Website development', 'Local SEO', 'Google Business Profile optimisation', 'Conversion copywriting'],
      'hasMap': 'https://maps.app.goo.gl/fnTiihMdcem2z4fn7',
      // Every profile that is this business, so search engines can join them up.
      'sameAs': [
        'https://maps.app.goo.gl/fnTiihMdcem2z4fn7',
        'https://www.instagram.com/magolabs.in/',
        'https://www.threads.com/@magolabs.in',
        'https://www.facebook.com/profile.php?id=61591983492179',
        'https://clutch.co/profile/mago-labs',
        'https://themanifest.com/company/mago-labs',
        'https://themagolabs.com/'
      ],
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Surat',
        'addressRegion': 'Gujarat',
        'addressCountry': 'IN'
      },
      'openingHoursSpecification': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'opens': '09:00',
        'closes': '19:00'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://www.magolabs.in/#website',
      'name': 'Mago Labs',
      'url': 'https://www.magolabs.in',
      'inLanguage': 'en-IN',
      'publisher': { '@id': 'https://www.magolabs.in/#localbusiness' }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': FAQS.map((faq) => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': { '@type': 'Answer', 'text': faq.answer }
      }))
    }
  ];

  return (
    <>
      <SEO path="/" schemas={homeSchemas} />

      <HomeTop
        onAudit={goToAudit}
        onOpenCaseStudy={onOpenCaseStudy}
        onSeeWork={() => navigateTo('work')}
        onReadStory={() => navigateTo('about')}
      />
      <ServicesPick onNavigate={navigateTo} />
      <WorkDeck onOpenCaseStudy={onOpenCaseStudy} onSeeWork={() => navigateTo('work')} />
      <BuiltFor />
      <ProcessCards />
      <UsVsThem />
      <FounderSoul />
      <ClientWords />

      <section id="faq" aria-labelledby="faq-title" className="bg-[#F4F3EF] py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <p className="v3-label">Questions</p>
            <h2 id="faq-title" className="v3-h2 mt-4 max-w-[12ch]">Asked before you ask.</h2>
          </div>
          <div className="border-t border-ink/15">
            {FAQS.map((faq, idx) => {
              const open = openFaq === idx;
              return (
                <div key={faq.question} className="border-b border-ink/15">
                  <h3>
                    <button type="button" onClick={() => toggleFaq(idx)} aria-expanded={open} aria-controls={`faq-${idx}`} className="flex w-full items-center justify-between gap-6 py-6 text-left text-[18px] font-bold tracking-[-0.01em] text-ink md:text-[20px]">
                      {faq.question}
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${open ? 'bg-brand text-ink' : 'bg-white text-ink'}`}>
                        {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                  </h3>
                  <div id={`faq-${idx}`} className={`grid transition-[grid-template-rows] duration-500 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <p className="max-w-[60ch] pb-6 text-[16px] leading-relaxed text-ink/70">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Closing mode={leadMode} onModeChange={setLeadMode} />
    </>
  );
}
