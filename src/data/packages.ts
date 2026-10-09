/**
 * The four website packages: one place for names, prices and timelines, so the
 * Pricing page, the Services page and the structured data always agree.
 *
 * Visitors in India see rupees. Australia, New Zealand, the UK and euro countries
 * see their own currency, and everyone else sees US dollars. The overseas prices
 * are one price list set in AUD (Growth is A$1,149) and converted. See
 * src/hooks/useCurrency.ts for how the visitor's currency is decided.
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
  prices: Record<'USD' | 'AUD' | 'GBP' | 'EUR' | 'NZD', string>;
  /** Days from start to launch. */
  days: number;
}

export const PACKAGES: PackageInfo[] = [
  { id: 'launch', number: '01', name: 'Launch', forWhom: 'A professional presence', inr: 17999, inrLabel: '₹17,999', usd: 399, usdLabel: '$399', prices: { USD: '$399', AUD: '$599', GBP: '£299', EUR: '€349', NZD: '$749' }, days: 5 },
  { id: 'growth', number: '02', name: 'Growth', forWhom: 'Generating enquiries', inr: 29999, inrLabel: '₹29,999', usd: 799, usdLabel: '$799', prices: { USD: '$799', AUD: '$1,149', GBP: '£599', EUR: '€699', NZD: '$1,449' }, days: 14 },
  { id: 'scale', number: '03', name: 'Scale', forWhom: 'A premium presence', inr: 49999, inrLabel: '₹49,999', usd: 1299, usdLabel: '$1,299', prices: { USD: '$1,299', AUD: '$1,899', GBP: '£999', EUR: '€1,149', NZD: '$2,399' }, days: 21 },
  { id: 'commerce', number: '04', name: 'Commerce', forWhom: 'Selling online', inr: 64999, inrLabel: '₹64,999', usd: 1699, usdLabel: '$1,699', prices: { USD: '$1,699', AUD: '$2,499', GBP: '£1,299', EUR: '€1,499', NZD: '$3,149' }, days: 28 },
];

export function getPackage(id: PackageInfo['id']): PackageInfo {
  return PACKAGES.find((pkg) => pkg.id === id) as PackageInfo;
}
