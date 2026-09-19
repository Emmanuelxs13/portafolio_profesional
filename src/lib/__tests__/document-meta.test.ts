/**
 * Pure helpers for per-locale document metadata and JSON-LD structured data.
 * These drive both the server-rendered layout (es defaults, crawler visible)
 * and the client LocaleDocumentSync component (active locale after hydration).
 */

import { buildJsonLd, getDocumentMeta, personDataFromProfile, SITE_URL } from '@/lib/document-meta';

describe('getDocumentMeta', () => {
  it('returns es defaults for the es locale', () => {
    const meta = getDocumentMeta('es');

    expect(meta.lang).toBe('es');
    expect(meta.description).toContain('Portafolio profesional');
    expect(meta.ogLocale).toBe('es_ES');
    expect(meta.ogImage).toBe(`${SITE_URL}/og/og-image.jpg`);
  });

  it('returns en localization for the en locale', () => {
    const meta = getDocumentMeta('en');

    expect(meta.lang).toBe('en');
    expect(meta.description).toContain('Professional portfolio');
    expect(meta.ogLocale).toBe('en_US');
    expect(meta.ogImage).toBe(`${SITE_URL}/og/og-image.jpg`);
  });
});

describe('buildJsonLd', () => {
  const person = {
    name: 'Emmanuel Berrio Jiménez',
    jobTitle: 'Desarrollador de Software FullStack',
    url: 'https://emmanuelberrio.dev',
    sameAs: [
      'https://www.linkedin.com/in/emmanuel-berrio-jimenez/',
      'https://github.com/Emmanuelxs13',
    ],
    email: 'emmanuelberriojimenez13@gmail.com',
  };

  it('emits Person and ProfilePage schemas carrying the person data', () => {
    const graph = JSON.parse(buildJsonLd(person)) as { '@graph': Array<Record<string, unknown>> };

    const types = graph['@graph'].map((node) => node['@type']);
    expect(types).toContain('Person');
    expect(types).toContain('ProfilePage');

    const personNode = graph['@graph'].find((node) => node['@type'] === 'Person');
    expect(personNode?.name).toBe(person.name);
    expect(personNode?.jobTitle).toBe(person.jobTitle);
    expect(personNode?.url).toBe(person.url);
    expect(personNode?.email).toBe(person.email);
    expect(personNode?.sameAs).toEqual(person.sameAs);

    const profilePage = graph['@graph'].find((node) => node['@type'] === 'ProfilePage');
    expect(profilePage?.mainEntity).toEqual({ '@id': `${person.url}#person` });
    expect(profilePage?.isPartOf).toEqual({
      '@type': 'WebSite',
      name: 'Emmanuel Berrio Portfolio',
      url: person.url,
    });
  });
});

describe('personDataFromProfile', () => {
  it('maps the profile to PersonData with a deduplicated sameAs list', () => {
    const data = personDataFromProfile({
      name: 'Emmanuel Berrio Jiménez',
      title: 'Desarrollador de Software FullStack',
      email: 'emmanuelberriojimenez13@gmail.com',
      website: 'https://emmanuelberrio.dev',
      linkedin: 'https://www.linkedin.com/in/emmanuel-berrio-jimenez/',
      github: 'https://github.com/Emmanuelxs13',
      social: { linkedin: 'https://www.linkedin.com/in/emmanuel-berrio-jimenez/' },
    });

    expect(data.url).toBe('https://emmanuelberrio.dev');
    expect(data.sameAs).toEqual([
      'https://www.linkedin.com/in/emmanuel-berrio-jimenez/',
      'https://github.com/Emmanuelxs13',
    ]);
    expect(data.email).toBe('emmanuelberriojimenez13@gmail.com');
  });

  it('defaults the URL to the site and drops empty sameAs entries', () => {
    const data = personDataFromProfile({
      name: 'X',
      title: 'Y',
      email: 'x@example.com',
    });

    expect(data.url).toBe(SITE_URL);
    expect(data.sameAs).toEqual([]);
  });
});