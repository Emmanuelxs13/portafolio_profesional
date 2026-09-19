/**
 * Client document sync: keeps <html lang>, the document title/description and
 * the OpenGraph/Twitter meta tags in step with the active locale, and rewrites
 * the JSON-LD (Person + ProfilePage) script.
 *
 * The layout renders the es defaults server-side (crawler visible); this
 * component updates them to the active locale after hydration and on every
 * locale switch.
 */

'use client';

import { useEffect } from 'react';
import { useI18n } from '@/hooks/useI18n';
import { getProfileSync } from '@/lib/api';
import { buildJsonLd, getDocumentMeta, personDataFromProfile, SITE_URL } from '@/lib/document-meta';

function upsertMeta(
  selector: string,
  attribute: string,
  attributeValue: string,
  content: string
) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, attributeValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function LocaleDocumentSync() {
  const { locale } = useI18n();

  useEffect(() => {
    const meta = getDocumentMeta(locale);
    const profile = getProfileSync(locale);

    document.documentElement.lang = meta.lang;
    document.title = meta.title;

    upsertMeta('meta[name="description"]', 'name', 'description', meta.description);
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', meta.ogTitle);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', meta.ogDescription);
    upsertMeta('meta[property="og:locale"]', 'property', 'og:locale', meta.ogLocale);
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', meta.ogImage);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', SITE_URL);
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', meta.twitterTitle);
    upsertMeta(
      'meta[name="twitter:description"]',
      'name',
      'twitter:description',
      meta.twitterDescription
    );

    let jsonLd = document.getElementById('json-ld') as HTMLScriptElement | null;
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.id = 'json-ld';
      jsonLd.type = 'application/ld+json';
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = buildJsonLd(personDataFromProfile(profile));
  }, [locale]);

  return null;
}