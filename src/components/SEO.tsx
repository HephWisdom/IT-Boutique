import { useEffect } from 'react';
import { company } from '../content/site';

type SEOProps = { title: string; description: string; path?: string; type?: 'website' | 'article'; jsonLd?: Record<string, unknown> };

function setMeta(name: string, content: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(property ? 'property' : 'name', name);
    document.head.appendChild(element);
  }
  element.content = content;
}

export function SEO({ title, description, path = '/', type = 'website', jsonLd }: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} — ${company.name}`;
    const url = `${company.siteUrl}${path}`;
    document.title = fullTitle;
    setMeta('description', description);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:type', type, true);
    setMeta('og:url', url, true);
    setMeta('twitter:card', 'summary_large_image');
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = url;
    document.getElementById('page-jsonld')?.remove();
    if (jsonLd) {
      const script = document.createElement('script'); script.id = 'page-jsonld'; script.type = 'application/ld+json'; script.text = JSON.stringify(jsonLd); document.head.appendChild(script);
    }
    return () => document.getElementById('page-jsonld')?.remove();
  }, [description, jsonLd, path, title, type]);
  return null;
}
