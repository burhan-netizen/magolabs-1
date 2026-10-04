export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  industry: 'Chartered Accountancy' | 'Manufacturing' | 'Solar & B2B Energy' | 'Timber & Wood Trading' | 'Dental & Healthcare' | 'Business & IT Consulting';
  quote: string;
  accent: string;
  initials: string;
}

// Real client feedback, collected from Google Reviews and direct client conversations.
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'darshan-galani',
    name: 'CA Darshan Galani',
    role: 'Proprietor',
    company: 'Darshan Galani & Co.',
    industry: 'Chartered Accountancy',
    quote:
      "Big thanks to Burhan Bhai at Mago Labs for an amazing job on our website! He listened carefully to what we wanted, suggested smart improvements, and turned everything around faster than expected. The site looks great on phones and desktop, loads quickly, and is easy to manage. He was always available for questions and gave clear guidance after launch. Highly recommend him for anyone needing a professional, friendly web developer.",
    accent: '#7C3AED',
    initials: 'DG',
  },
  {
    id: 'smit-antala',
    name: 'Smit Antala',
    role: 'Director',
    company: 'Antala Metals Pvt Ltd',
    industry: 'Manufacturing',
    quote:
      "I honestly couldn't be happier with the website Mago Labs built for us. From the first discussion to the final delivery, everything was handled so professionally. They understood exactly what we wanted, suggested great ideas, and the final website turned out even better than we expected. The team was always quick to respond and made the whole experience completely stress-free. Would definitely recommend Mago Labs to anyone looking for a high-quality website.",
    accent: '#B45309',
    initials: 'SA',
  },
  {
    id: 'manav-shah',
    name: 'Manav Shah',
    role: 'Founder',
    company: 'SolWay Energies',
    industry: 'Solar & B2B Energy',
    quote: 'Very good website designs. Incredibly responsive team. Quick feedback turnaround. Great value.',
    accent: '#D97706',
    initials: 'MS',
  },
  {
    id: 'jay-mehta',
    name: 'CA Jay Mehta',
    role: 'Proprietor',
    company: 'Jay Mehta & Co.',
    industry: 'Chartered Accountancy',
    quote:
      "Working with Burhan at Mago Labs was refreshing. We finally have a website that reflects how we work with our clients: clear, professional, and easy to trust. He handled everything from structure to launch without us ever having to chase for updates, and the site works beautifully on mobile too. Exactly what our practice needed.",
    accent: '#0891B2',
    initials: 'JM',
  },
  {
    id: 'manish-khandelwal',
    name: 'CA Manish Khandelwal',
    role: 'Partner',
    company: 'MNP & Co.',
    industry: 'Chartered Accountancy',
    quote:
      "Our old website barely got us any enquiries. Mago Labs rebuilt it from scratch with a clean layout and much better structure, and we've noticed a real difference in how prospective clients respond after visiting the site. Burhan was responsive throughout and made revisions quickly whenever we asked.",
    accent: '#2563EB',
    initials: 'MK',
  },
  {
    id: 'ketan-mayani',
    name: 'CA Ketan Mayani',
    role: 'Proprietor',
    company: 'K.D. Mayani & Co.',
    industry: 'Chartered Accountancy',
    quote:
      "A very professional experience from start to finish. Burhan understood exactly what a CA firm needs online: credibility, clarity, and easy navigation for clients. The site was delivered on schedule and he was quick to make small adjustments even after launch. Would recommend Mago Labs to any professional firm looking to build trust online.",
    accent: '#059669',
    initials: 'KM',
  },
  {
    id: 'mihir-shah',
    name: 'Dr. Mihir Shah',
    role: 'Owner',
    company: 'Dr. Mihir Shah Smile Care Clinic',
    industry: 'Dental & Healthcare',
    quote: 'Absolutely professional people, know their work in best manner, I will absolutely recommend these people for website related work.',
    accent: '#0D9488',
    initials: 'MSC',
  },
  {
    id: 'harshit-chopra',
    name: 'Harshit Chopra',
    role: 'Owner',
    company: 'Santosh Timbers',
    industry: 'Timber & Wood Trading',
    quote:
      "Gorgeous website and amazing service from start to finish. The Mago Labs team gave us great design and amazing support throughout, exactly what we needed for the business.",
    accent: '#92400E',
    initials: 'HC',
  },
  {
    id: 'denish-dalal',
    name: 'Denish Dalal',
    role: 'Founder',
    company: 'Astrabizz Consultancy',
    industry: 'Business & IT Consulting',
    quote:
      "Our website finally reflects the seriousness of the work we do. Since launch we have started receiving enquiries directly through the site, and prospects come to the first conversation already knowing what we offer. Burhan and the Mago Labs team were responsive at every step.",
    accent: '#16A34A',
    initials: 'DD',
  },
];

/** The industries the reviews come from, in the order the filter shows them. */
export const TESTIMONIAL_INDUSTRIES: Testimonial['industry'][] = [
  'Chartered Accountancy',
  'Manufacturing',
  'Solar & B2B Energy',
  'Timber & Wood Trading',
  'Dental & Healthcare',
  'Business & IT Consulting',
];
