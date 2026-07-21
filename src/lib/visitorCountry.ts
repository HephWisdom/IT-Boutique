import { useState } from 'react';

export function inferVisitorCountry(locales: readonly string[] | undefined): string | null {
  if (!locales?.length || typeof Intl.Locale !== 'function' || typeof Intl.DisplayNames !== 'function') return null;

  for (const locale of locales) {
    try {
      const region = new Intl.Locale(locale.replace('_', '-')).region;
      if (!region) continue;
      const country = new Intl.DisplayNames(['en'], { type: 'region' }).of(region);
      if (country && country !== region) return country;
    } catch {
      // Ignore malformed or unsupported locale values and try the next one.
    }
  }

  return null;
}

export function useVisitorCountry() {
  const [country] = useState<string | null>(() => {
    if (typeof navigator === 'undefined') return null;
    const locales = navigator.languages?.length ? navigator.languages : [navigator.language];
    return inferVisitorCountry(locales);
  });

  return country;
}
