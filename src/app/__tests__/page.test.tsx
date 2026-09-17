/**
 * Page-level tests: the Projects section is re-enabled right after the Hero,
 * before Experience, with a stable #projects anchor.
 */

import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { ReactNode } from 'react';
import Home from '@/app/page';
import { I18nProvider } from '@/hooks/useI18n';

jest.mock('framer-motion', () => {
  const VNode = ({ children }: { children?: ReactNode }) => <>{children}</>;
  return {
    motion: {
      div: VNode,
      h1: VNode,
      h2: VNode,
      h3: VNode,
      p: VNode,
      span: VNode,
      a: VNode,
      button: VNode,
      header: VNode,
    },
    AnimatePresence: ({ children }: { children?: ReactNode }) => <>{children}</>,
  };
});

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

jest.mock('next/image', () => {
  type MockImageProps = {
    src: string;
    alt: string;
  };
  const MockImage = ({ src, alt }: MockImageProps) => <div role="img" aria-label={alt} data-src={src} />;
  MockImage.displayName = 'MockImage';
  return { __esModule: true, default: MockImage };
});

jest.mock('@/components/ExperienceTimeline', () => ({
  __esModule: true,
  default: () => <section id="experience">Experience</section>,
}));
jest.mock('@/components/EducationTimeline', () => ({
  __esModule: true,
  default: () => <section id="education">Education</section>,
}));
jest.mock('@/components/CertificateList', () => ({
  __esModule: true,
  default: () => <section id="certificates">Certificates</section>,
}));
jest.mock('@/components/ReferencesSection', () => ({
  __esModule: true,
  default: () => <section id="references">References</section>,
}));
jest.mock('@/components/ContactForm', () => ({
  __esModule: true,
  default: () => <section id="contact">Contact</section>,
}));
jest.mock('@/components/Footer', () => ({
  __esModule: true,
  default: () => <footer>Footer</footer>,
}));

const renderHome = () =>
  render(
    <I18nProvider>
      <Home />
    </I18nProvider>
  );

const collectSectionIds = (container: HTMLElement): string[] =>
  Array.from(container.querySelectorAll('section[id]')).map((section) => section.id);

describe('Home page section order', () => {
  it('renders a live #projects section after Hero and before Experience', async () => {
    const { container } = renderHome();
    await waitFor(() => {
      const ids = collectSectionIds(container);
      expect(ids).toContain('home');
      expect(ids).toContain('projects');
      expect(ids).toContain('experience');
    });
    const ids = collectSectionIds(container);
    expect(ids.indexOf('home')).toBeLessThan(ids.indexOf('projects'));
    expect(ids.indexOf('projects')).toBeLessThan(ids.indexOf('experience'));
  });

  it('renders a featured project card inside the #projects section', async () => {
    const { container } = renderHome();
    const title = await screen.findByText('iMagiQ');
    const section = container.querySelector('section#projects');
    expect(section).not.toBeNull();
    expect(section?.closest('main')).not.toBeNull();
    expect(title.closest('article')).not.toBeNull();
  });
});