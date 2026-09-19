/**
 * LocaleDocumentSync tests: after mount (and on locale switch) the document
 * language, title/description and OpenGraph/Twitter meta tags follow the
 * active locale, and the JSON-LD script carries Person + ProfilePage schemas
 * pointing at the og:image asset and the site URL.
 */

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { I18nProvider, useI18n } from '@/hooks/useI18n';
import LocaleDocumentSync from '@/components/LocaleDocumentSync';
import { getProfileSync } from '@/lib/api';
import { SITE_URL } from '@/lib/document-meta';

function SyncHarness() {
  const { setLocale } = useI18n();
  return (
    <>
      <button type="button" onClick={() => setLocale('en')}>
        switch-en
      </button>
      <button type="button" onClick={() => setLocale('es')}>
        switch-es
      </button>
      <LocaleDocumentSync />
    </>
  );
}

const renderHarness = () =>
  render(
    <I18nProvider>
      <SyncHarness />
    </I18nProvider>
  );

const readHeadMeta = () => ({
  description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
  ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute('content'),
  ogLocale: document.querySelector('meta[property="og:locale"]')?.getAttribute('content'),
  jsonLd: document.getElementById('json-ld')?.textContent ?? '',
});

const jsonLdGraph = (): Array<Record<string, unknown>> =>
  (JSON.parse(readHeadMeta().jsonLd) as { '@graph': Array<Record<string, unknown>> })['@graph'];

beforeEach(() => {
  document.head.querySelectorAll('meta, script#json-ld').forEach((el) => el.remove());
  document.title = '';
  document.documentElement.lang = '';
});

describe('LocaleDocumentSync', () => {
  it('sets the es language and es metadata on the document after mount', () => {
    renderHarness();

    expect(document.documentElement.lang).toBe('es');
    expect(document.title).toContain('Full-Stack Developer');
    expect(readHeadMeta().description).toContain('Portafolio profesional');
    expect(readHeadMeta().ogLocale).toBe('es_ES');
    expect(readHeadMeta().ogImage).toBe(`${SITE_URL}/og/og-image.jpg`);
  });

  it('switches language, metadata and JSON-LD with the active locale', () => {
    renderHarness();

    fireEvent.click(screen.getByText('switch-en'));

    expect(document.documentElement.lang).toBe('en');
    expect(readHeadMeta().description).toContain('Professional portfolio');
    expect(readHeadMeta().ogLocale).toBe('en_US');

    const personNode = jsonLdGraph().find((node) => node['@type'] === 'Person');
    expect(personNode?.jobTitle).toBe(getProfileSync('en').title);

    fireEvent.click(screen.getByText('switch-es'));
    expect(document.documentElement.lang).toBe('es');
    expect(readHeadMeta().ogLocale).toBe('es_ES');
  });

  it('writes a JSON-LD script with Person and ProfilePage schemas', () => {
    renderHarness();

    const graph = jsonLdGraph();
    const types = graph.map((node) => node['@type']);
    expect(types.sort()).toEqual(['Person', 'ProfilePage']);

    const profile = getProfileSync('es');
    const personNode = graph.find((node) => node['@type'] === 'Person') as Record<string, unknown>;
    expect(personNode.name).toBe(profile.name);
    expect(personNode.jobTitle).toBe(profile.title);
    expect(personNode.url).toBe('https://emmanuelberrio.dev');
    expect(personNode.email).toBe(profile.email);
    expect(personNode.sameAs).toEqual(
      expect.arrayContaining([profile.linkedin, profile.github])
    );

    const profilePage = graph.find((node) => node['@type'] === 'ProfilePage') as Record<
      string,
      unknown
    >;
    expect(profilePage.mainEntity).toEqual({ '@id': `${personNode.url}#person` });
  });
});