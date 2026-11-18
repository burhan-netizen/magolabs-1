/**
 * Every review on the Mago Labs Google Business Profile, quoted exactly as written
 * on Google (spelling included), newest first. Keep this list in step with Google.
 * A review with no text (a star rating only) has quote: null.
 */
export interface GoogleReview {
  name: string;
  quote: string | null;
}

export const GOOGLE_PROFILE_URL = 'https://maps.app.goo.gl/fnTiihMdcem2z4fn7';
export const GOOGLE_REVIEW_URL = 'https://g.page/r/CXyj1A87sv2BEBM/review';
export const GOOGLE_RATING = '5.0';

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    name: 'John',
    quote:
      'Mago Labs.. wow! By far the most helpful content creator. Literally took control of everything and made my life a million times easier. Would highly and truely recommend their team for everyone else. Couldn’t thank them enough!',
  },
  { name: 'Juhi Bais', quote: null },
  {
    name: 'Laxman Selukar',
    quote:
      'Appreciate Burhan bhai and mago labs team, website not only looks good but its been just 40 days and I have already started receiving organic inquiries. Design, taste , speed, execution everything was upto the mark. Highly recommended',
  },
  {
    name: 'mihir shah',
    quote: 'Absolutely professional people ,know there work in best manner,I will absolutely recommend this people for website related work',
  },
  { name: 'Manav Shah', quote: 'Very good website designs. Incredibly responsive team. Quick feedback turnaround. Great value.' },
  {
    name: 'CA Darshan Galani',
    quote:
      'Big thanks to Burhan Bhai at Mago Labs for an amazing job on our website! He listened carefully to what we wanted, suggested smart improvements, and turned everything around faster than expected. The site looks great on phones and desktop, loads quickly, and is easy to manage. He was always available for questions and gave clear guidance after launch. Highly recommend him for anyone needing a professional, friendly web developer.',
  },
  {
    name: 'Smit Antala',
    quote:
      'I honestly couldn’t be happier with the website Mago Labs built for us. From the first discussion the final delivery, everything was handled so professionally. They understood exactly what we wanted, suggested great ideas, and the final website turned out even better than we expected. The team was always quick to respond and made the whole experience completely stress-free. Would definitely recommend Mago Labs to anyone looking for a high-quality website. 👌👌',
  },
  { name: 'Ketan Mayani', quote: 'Very good services, supportive staff' },
];
