/**
 * The four website packages: one place for names, prices and timelines, so the
 * Pricing page, the Services page and the structured data always agree.
 *
 * Visitors in India see rupees. Visitors elsewhere see the international (USD)
 * price list. See src/hooks/useCurrency.ts for how that is decided.
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
  /** Days from start to launch. */
  days: number;
}

export const PACKAGES: PackageInfo[] = [
  { id: 'launch', number: '01', name: 'Launch', forWhom: 'A professional presence', inr: 17999, inrLabel: '₹17,999', usd: 599, usdLabel: '$599', days: 5 },
  { id: 'growth', number: '02', name: 'Growth', forWhom: 'Generating enquiries', inr: 29999, inrLabel: '₹29,999', usd: 1149, usdLabel: '$1,149', days: 14 },
  { id: 'scale', number: '03', name: 'Scale', forWhom: 'A premium presence', inr: 49999, inrLabel: '₹49,999', usd: 1899, usdLabel: '$1,899', days: 21 },
  { id: 'commerce', number: '04', name: 'Commerce', forWhom: 'Selling online', inr: 64999, inrLabel: '₹64,999', usd: 2499, usdLabel: '$2,499', days: 28 },
];

export function getPackage(id: PackageInfo['id']): PackageInfo {
  return PACKAGES.find((pkg) => pkg.id === id) as PackageInfo;
}
