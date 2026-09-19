/**
 * Per-locale document metadata and JSON-LD structured data.
 *
 * Single source for both the server-rendered layout (es defaults, crawler
 * visible) and the client LocaleDocumentSync component (active locale after
 * hydration and on switch).
 */

import type { Locale } from '@/lib/profile/types';

export const SITE_URL = 'https://emmanuelberrio.dev';
export const SITE_NAME = 'Emmanuel Berrio Portfolio';
export const OG_IMAGE_PATH = '/og/og-image.jpg';

export interface DocumentMeta {
  lang: Locale;
  title: string;
  description: string;
  ogLocale: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
}

const TITLE = 'Emmanuel Berrio Jiménez | Full-Stack Developer';

export function getDocumentMeta(locale: Locale): DocumentMeta {
  const isEs = locale === 'es';
  return {
    lang: locale,
    title: TITLE,
    description: isEs
      ? 'Portafolio profesional de Emmanuel Berrio Jiménez - Desarrollador Full-Stack especializado en React, Next.js, TypeScript y Node.js'
      : 'Professional portfolio of Emmanuel Berrio Jiménez - Full-Stack Developer specialized in React, Next.js, TypeScript and Node.js',
    ogLocale: isEs ? 'es_ES' : 'en_US',
    ogTitle: TITLE,
    ogDescription: isEs
      ? 'Portafolio profesional de Emmanuel Berrio Jiménez'
      : 'Professional portfolio of Emmanuel Berrio Jiménez',
    ogImage: `${SITE_URL}${OG_IMAGE_PATH}`,
    twitterTitle: TITLE,
    twitterDescription: isEs
      ? 'Portafolio profesional de Emmanuel Berrio Jiménez'
      : 'Professional portfolio of Emmanuel Berrio Jiménez',
  };
}

export interface PersonData {
  name: string;
  jobTitle: string;
  url: string;
  sameAs: string[];
  email: string;
}

export function personDataFromProfile(profile: {
  name: string;
  title: string;
  email: string;
  website?: string;
  linkedin?: string;
  github?: string;
  social?: { linkedin?: string; github?: string } | null;
}): PersonData {
  return {
    name: profile.name,
    jobTitle: profile.title,
    url: profile.website ?? SITE_URL,
    sameAs: [
      ...new Set(
        [profile.linkedin, profile.social?.linkedin, profile.github, profile.social?.github].filter(
          (value): value is string => Boolean(value)
        )
      ),
    ],
    email: profile.email,
  };
}

export function buildJsonLd(person: PersonData): string {
  const personNode = {
    '@type': 'Person',
    '@id': `${person.url}#person`,
    name: person.name,
    jobTitle: person.jobTitle,
    url: person.url,
    sameAs: person.sameAs,
    email: person.email,
  };
  const profilePageNode = {
    '@type': 'ProfilePage',
    '@id': `${person.url}#profilepage`,
    url: person.url,
    name: TITLE,
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: person.url },
    mainEntity: { '@id': `${person.url}#person` },
  };
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [personNode, profilePageNode],
  });
}