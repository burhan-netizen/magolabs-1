import { useEffect, useState } from 'react';

export type Currency = 'INR' | 'USD';

/** India's time zone goes by two names depending on the device. */
const INDIA_TIME_ZONES = ['Asia/Kolkata', 'Asia/Calcutta'];

/** Works out which price list a visitor should see, from their device's time zone.
 *  India sees rupees; everywhere else sees US dollars. If the time zone cannot be
 *  read, rupees are shown. */
export function detectCurrency(): Currency {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return !zone || INDIA_TIME_ZONES.includes(zone) ? 'INR' : 'USD';
  } catch {
    return 'INR';
  }
}

/**
 * The visitor's currency. Starts as rupees so the first render matches the
 * prerendered HTML, then switches after mount for visitors outside India.
 * A small script in index.html marks <html data-currency="usd"> before the page
 * paints, and the stylesheet hides rupee prices in that case, so an overseas
 * visitor never sees the rupee price flash first.
 */
export function useCurrency(): Currency {
  const [currency, setCurrency] = useState<Currency>('INR');
  useEffect(() => {
    setCurrency(detectCurrency());
  }, []);
  return currency;
}
