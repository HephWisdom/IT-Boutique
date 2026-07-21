import { describe, expect, it } from 'vitest';
import { inferVisitorCountry } from '../lib/visitorCountry';

describe('visitor country inference', () => {
  it('uses the explicit region from a browser locale', () => {
    expect(inferVisitorCountry(['de-DE', 'de'])).toBe('Germany');
    expect(inferVisitorCountry(['en-US', 'en'])).toBe('United States');
  });

  it('falls back when no locale contains a region', () => {
    expect(inferVisitorCountry(['en', 'fr'])).toBeNull();
    expect(inferVisitorCountry(undefined)).toBeNull();
  });

  it('ignores malformed locale values', () => {
    expect(inferVisitorCountry(['not a locale', 'nl-NL'])).toBe('Netherlands');
  });
});
