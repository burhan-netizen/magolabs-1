import { PackageInfo } from '../data/packages';
import { useCurrency } from '../hooks/useCurrency';

interface PriceProps {
  pkg: PackageInfo;
  key?: string | number;
}

/** A package's starting price in the visitor's currency. */
export default function Price({ pkg }: PriceProps) {
  const currency = useCurrency();
  if (currency !== 'INR') return <span>{pkg.prices[currency]}</span>;
  // "cur-inr" lets the stylesheet hide the rupee price for overseas visitors
  // during the instant before their own price replaces it.
  return <span className="cur-inr">{pkg.inrLabel}</span>;
}
