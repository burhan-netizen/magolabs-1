import { useEffect, useState } from 'react';

export type Currency = 'INR' | 'USD' | 'AUD' | 'GBP' | 'EUR' | 'NZD';

/** India's time zone goes by two names depending on the device. */
const INDIA_TIME_ZONES = ['Asia/Kolkata', 'Asia/Calcutta'];

/** UK time zones (including the Crown Dependencies, which use sterling). */
const UK_TIME_ZONES = ['Europe/London', 'Europe/Belfast', 'Europe/Guernsey', 'Europe/Jersey', 'Europe/Isle_of_Man'];

/** Time zones of the countries that use the euro. */
const EURO_TIME_ZONES = [
  'Europe/Vienna', 'Europe/Brussels', 'Asia/Nicosia', 'Asia/Famagusta', 'Europe/Nicosia', 'Europe/Zagreb', 'Europe/Tallinn',
  'Europe/Helsinki', 'Europe/Mariehamn', 'Europe/Paris', 'Europe/Berlin', 'Europe/Busingen', 'Europe/Athens', 'Europe/Dublin',
  'Europe/Rome', 'Europe/Riga', 'Europe/Vilnius', 'Europe/Luxembourg', 'Europe/Malta', 'Europe/Amsterdam', 'Europe/Lisbon',
  'Atlantic/Madeira', 'Atlantic/Azores', 'Europe/Bratislava', 'Europe/Ljubljana', 'Europe/Madrid', 'Africa/Ceuta',
  'Atlantic/Canary', 'Europe/Monaco', 'Europe/San_Marino', 'Europe/Vatican', 'Europe/Andorra', 'Europe/Podgorica',
  'Europe/Sofia',
];

/** Works out which price list a visitor should see, from their device's time zone.
 *  India sees rupees, Australia AUD, New Zealand NZD, the UK pounds, euro countries
 *  euros, and everywhere else US dollars. If the time zone cannot be read, rupees
 *  are shown. Keep this in step with the small script in index.html. */
export function detectCurrency(): Currency {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!zone || INDIA_TIME_ZONES.includes(zone)) return 'INR';
    if (zone.startsWith('Australia/')) return 'AUD';
    if (zone === 'Pacific/Auckland' || zone === 'Pacific/Chatham') return 'NZD';
    if (UK_TIME_ZONES.includes(zone)) return 'GBP';
    if (EURO_TIME_ZONES.includes(zone)) return 'EUR';
    return 'USD';
  } catch {
    return 'INR';
  }
}

/**
 * The visitor's currency. Starts as rupees so the first render matches the
 * prerendered HTML, then switches after mount for visitors outside India.
 * A small script in index.html marks <html data-currency="..."> before the page
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
