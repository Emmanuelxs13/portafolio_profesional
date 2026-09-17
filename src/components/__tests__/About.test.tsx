/**
 * About tests: the CV download control must resolve to an existing asset for
 * the active locale and must never leave a broken href. There is no EN PDF in
 * public/ yet, so the EN control falls back to the ES asset through /api/cv
 * with truthful "(ES)" labeling instead of pointing at a missing file.
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { ReactNode } from 'react';
import About from '@/components/About';
import { translations, type Locale } from '@/hooks/useI18n';

jest.mock('framer-motion', () => {
  const VNode = ({ children }: { children?: ReactNode }) => <>{children}</>;
  const A = ({
    href,
    className,
    children,
  }: {
    href?: string;
    className?: string;
    children?: ReactNode;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  );
  return {
    motion: {
      div: VNode,
      h1: VNode,
      h2: VNode,
      h3: VNode,
      p: VNode,
      span: VNode,
      a: A,
      button: VNode,
    },
    AnimatePresence: ({ children }: { children?: ReactNode }) => <>{children}</>,
  };
});

jest.mock('next/image', () => {
  type MockImageProps = {
    src: string;
    alt: string;
  };
  const MockImage = ({ src, alt }: MockImageProps) => (
    <div role="img" aria-label={alt} data-src={src} />
  );
  MockImage.displayName = 'MockImage';
  return { __esModule: true, default: MockImage };
});

const stats = {
  yearsOfExperience: 6,
  projectsCompleted: 12,
  certificatesEarned: 5,
  technologiesUsed: 20,
};

const renderAbout = (locale: Locale) =>
  render(
    <About
      t={(key) => translations[locale][key] ?? key}
      summary={translations[locale]['hero.impact']}
      stats={stats}
      locale={locale}
    />
  );

describe('About CV download control', () => {
  it('renders the optimized webp profile photo instead of the legacy JPG', () => {
    renderAbout('es');

    const image = screen.getByRole('img', { name: 'Emmanuel Berrio - Software Developer' });
    expect(image).toHaveAttribute('data-src', '/img/about/fotoPerfil.webp');
  });

  it('renders an anchor to the existing CV asset for the es locale', () => {
    renderAbout('es');

    const link = screen.getByRole('link', { name: 'Descargar CV' });
    expect(link).toHaveAttribute('href', '/api/cv?lang=es');
  });

  it('falls back to the existing PDF with truthful labeling for the en locale', () => {
    renderAbout('en');

    const link = screen.getByRole('link', { name: /Download CV/ });
    expect(link).toHaveTextContent('(ES)');
    expect(link).toHaveAttribute('href', '/api/cv?lang=es');
    expect(link).not.toHaveAttribute('href', '/api/cv?lang=en');
  });

  it('leaves no CV href pointing at a missing locale asset', () => {
    renderAbout('en');

    const cvLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href*="/api/cv"]'));
    expect(cvLinks.length).toBeGreaterThan(0);
    for (const link of cvLinks) {
      expect(link.getAttribute('href')).not.toContain('lang=en');
    }
  });
});