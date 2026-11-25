import { ArrowRight, Check, Minus, Phone, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { PageId } from '../types';
import SEO from '../components/SEO';
import PageLink from '../components/PageLink';
import LeadForm, { LeadMode } from '../components/LeadForm';
import { WhatsAppLogo } from '../components/BrandIcons';
import { WHATSAPP_URL, CALL_URL, PHONE_DISPLAY } from '../utils/contactLinks';
import HomeTop from '../components/home/HomeTop';
import CurveMarquee from '../components/home/CurveMarquee';
import ProblemScroll from '../components/home/ProblemScroll';
import NoWebsite from '../components/home/NoWebsite';
import ServicesTilt from '../components/home/ServicesTilt';
import WorkFlyover from '../components/home/WorkFlyover';
import ResultsBig from '../components/home/ResultsBig';
import TestimonialColumns from '../components/home/TestimonialColumns';
import FounderStory from '../components/home/FounderStory';
import Reveal from '../components/home/Reveal';

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

const WITH_MAGO = [
  'A design made for your business, from a blank canvas.',
  'A site that loads fast on any phone and any network.',
  'Copy written by a human who has studied your buyers.',
  'One person to talk to, the founder, from start to finish.',
  'Your domain and code in your name, with hosting included.',
  'A fixed quote before any work starts.',
];

const THE_USUAL = [
  'A template that other clients also get.',
  'Page builders and plug-ins that slow everything down.',
  'Generic filler text that could describe anyone.',
  'Your project passed between account managers.',
  'Your own domain and code kept out of your reach.',
  'A scope and a bill that shift after you sign.',
];

// The first step differs by starting point; the rest is the same for everyone.
const FIRST_STEP: Record<LeadMode, { heading: string; intro: string; title: string; desc: string }> = {
  audit: {
    heading: 'Start with a free audit.',
    intro: 'It takes a minute to ask, and you will know exactly where your website stands.',
    title: 'Send us your website address.',
    desc: 'We review it for free and tell you plainly what is costing you enquiries.',
  },
  new: {
    heading: 'Start with a free website plan.',
    intro: 'It takes a minute to ask, and you will know exactly what your first website needs.',
    title: 'Tell us what your business does.',
    desc: 'We send you a free plan: the pages you need, what they should say, and how customers will find you.',
  },
};

const NEXT_STEPS = [
  {
    title: 'Get a fixed quote.',
    desc: 'You see exactly what we would build and what it costs. No obligation to go ahead.',
  },
  {
    title: 'Launch in 5 to 28 days.',
    desc: 'You approve the design before we build it, and you own everything at the end.',
  },
];

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
  const startWithoutWebsite = () => {
    setLeadMode('new');
    document.getElementById('next-step')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const firstStep = FIRST_STEP[leadMode];
  const steps = [{ title: firstStep.title, desc: firstStep.desc }, ...NEXT_STEPS];

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

      {/* First look: the floating hero and the intro sheet that rises over it.
          The remaining sections follow once these two are approved. */}
      <HomeTop
        onAudit={goToAudit}
        onOpenCaseStudy={onOpenCaseStudy}
        onSeeWork={() => navigateTo('work')}
        onReadStory={() => navigateTo('about')}
      />
    </>
  );
}
