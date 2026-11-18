/**
 * The four website packages: one place for names, prices and timelines, so the
 * Pricing page, the Services page and the structured data always agree.
 *
 * Visitors in India see rupees. Australia, New Zealand, Canada, the UK and euro
 * countries see their own currency, and everyone else sees US dollars. USD, GBP,
 * EUR and CAD match the partner rate cards (Nov 2026); AUD and NZD are converted
 * from the USD list and rounded. See src/hooks/useCurrency.ts for how the
 * visitor's currency is decided.
 */
export interface PackageInfo {
  id: 'launch' | 'growth' | 'scale' | 'commerce';
  number: string;
  name: string;
  forWhom: string;
  /** Starting price in India, in rupees. */
  inr: number;
  inrLabel: string;
  /** Starting price outside India, in US dollars. */
  usd: number;
  usdLabel: string;
  /** Starting price shown in each overseas currency. */
  prices: Record<'USD' | 'AUD' | 'GBP' | 'EUR' | 'NZD' | 'CAD', string>;
  /** Days from start to launch. */
  days: number;
}

export const PACKAGES: PackageInfo[] = [
  { id: 'launch', number: '01', name: 'Launch', forWhom: 'A professional presence', inr: 17999, inrLabel: '₹17,999', usd: 999, usdLabel: '$999', prices: { USD: '$999', AUD: '$1,449', GBP: '£749', EUR: '€899', NZD: '$1,799', CAD: '$1,399' }, days: 5 },
  { id: 'growth', number: '02', name: 'Growth', forWhom: 'Generating enquiries', inr: 29999, inrLabel: '₹29,999', usd: 1499, usdLabel: '$1,499', prices: { USD: '$1,499', AUD: '$2,149', GBP: '£1,099', EUR: '€1,399', NZD: '$2,699', CAD: '$2,099' }, days: 14 },
  { id: 'scale', number: '03', name: 'Scale', forWhom: 'A premium presence', inr: 49999, inrLabel: '₹49,999', usd: 2499, usdLabel: '$2,499', prices: { USD: '$2,499', AUD: '$3,599', GBP: '£1,899', EUR: '€2,299', NZD: '$4,499', CAD: '$3,499' }, days: 21 },
  { id: 'commerce', number: '04', name: 'Commerce', forWhom: 'Selling online', inr: 64999, inrLabel: '₹64,999', usd: 3999, usdLabel: '$3,999', prices: { USD: '$3,999', AUD: '$5,749', GBP: '£2,999', EUR: '€3,699', NZD: '$7,249', CAD: '$5,699' }, days: 28 },
];

export function getPackage(id: PackageInfo['id']): PackageInfo {
  return PACKAGES.find((pkg) => pkg.id === id) as PackageInfo;
}

/** Hourly rate for changes after the first year of free support, outside India.
 *  Indian visitors see "a simple hourly rate" with no number. */
export const HOURLY_RATE: Record<keyof PackageInfo['prices'], string> = {
  USD: '$30', GBP: '£25', EUR: '€28', CAD: '$40', AUD: '$45', NZD: '$50',
};
