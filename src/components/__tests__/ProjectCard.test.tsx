/**
 * Behavioral tests for ProjectCard variants (featured | compact),
 * the designed image fallback, and localized action labels.
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectCard from '@/components/ProjectCard';
import type { Project } from '@/types/profile';

jest.mock('next/image', () => {
  type MockImageProps = {
    src: string;
    alt: string;
    className?: string;
    sizes?: string;
  };
  const MockImage = ({ src, alt, className }: MockImageProps) => (
    <div role="img" aria-label={alt} className={className} data-src={src} />
  );
  MockImage.displayName = 'MockImage';
  return { __esModule: true, default: MockImage };
});

const esT = (key: string) =>
  ({
    'projects.badge': 'Destacado',
    'projects.viewDemo': 'Ver Demo',
    'projects.code': 'Código',
  }[key] ?? key);

const enT = (key: string) =>
  ({
    'projects.badge': 'Featured',
    'projects.viewDemo': 'View Demo',
    'projects.code': 'Code',
  }[key] ?? key);

const featuredProject: Project = {
  id: 'proj-3',
  title: 'iMagiQ',
  description: 'Official authorized Samsung Colombia store.',
  longDescription: 'Built the complete frontend of the official store.',
  tech: ['React', 'TypeScript'],
  link: 'https://www.imagiq.com/',
  featured: true,
  category: 'client',
  company: 'iMagiQ',
  role: 'Frontend Developer',
  highlights: ['Complete frontend development of the official store'],
};

const compactProject: Project = {
  id: 'proj-1',
  title: 'Portada Real Estate CRM',
  description: 'Custom CRM system for real estate management.',
  tech: ['PHP', 'React', 'MySQL'],
  link: '',
  github: '',
  featured: false,
  category: 'client',
};

describe('ProjectCard featured variant', () => {
  it('renders a semantic article with title, role, highlights, and a prominent live link', () => {
    render(<ProjectCard project={featuredProject} t={esT} />);
    const card = screen.getByRole('article');
    expect(card).toHaveTextContent('iMagiQ');
    expect(card).toHaveTextContent('Frontend Developer');
    expect(card).toHaveTextContent('Complete frontend development of the official store');
    const liveLink = screen.getByRole('link', { name: 'Ver Demo: iMagiQ' }) as HTMLAnchorElement;
    expect(liveLink.href).toBe('https://www.imagiq.com/');
  });

  it('renders the localized featured badge', () => {
    render(<ProjectCard project={featuredProject} t={esT} />);
    expect(screen.getByText('Destacado')).toBeInTheDocument();
  });

  it('renders English badge and action labels for locale en', () => {
    render(<ProjectCard project={featuredProject} t={enT} />);
    expect(screen.getByText('Featured')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View Demo: iMagiQ' })).toBeInTheDocument();
  });

  it('renders a repo link with a descriptive accessible name when github is present', () => {
    const withRepo = { ...featuredProject, github: 'https://github.com/Emmanuelxs13/imagiq' };
    render(<ProjectCard project={withRepo} t={esT} />);
    const repoLink = screen.getByRole('link', { name: 'Código: iMagiQ' }) as HTMLAnchorElement;
    expect(repoLink.href).toBe('https://github.com/Emmanuelxs13/imagiq');
  });
});

describe('ProjectCard compact variant', () => {
  it('renders short description and tech chips without the featured badge', () => {
    render(<ProjectCard project={compactProject} t={esT} />);
    const card = screen.getByRole('article');
    expect(card).toHaveTextContent('Portada Real Estate CRM');
    expect(card).toHaveTextContent('Custom CRM system for real estate management.');
    expect(card).toHaveTextContent('MySQL');
    expect(screen.queryByText('Destacado')).not.toBeInTheDocument();
  });
});

describe('ProjectCard image strategy', () => {
  it('renders the designed monogram fallback and no image element when no asset is registered', () => {
    render(<ProjectCard project={featuredProject} t={esT} />);
    expect(screen.getByText('IM')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders next/image with the project title as alt text when the asset resolves', () => {
    const resolveImage = () => '/projects/crm-inmobiliaria.jpg';
    render(<ProjectCard project={featuredProject} t={esT} resolveImage={resolveImage} />);
    expect(screen.getByRole('img', { name: 'iMagiQ' })).toBeInTheDocument();
    expect(screen.queryByText('IM')).not.toBeInTheDocument();
  });
});