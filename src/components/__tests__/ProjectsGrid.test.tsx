/**
 * Behavioral tests for the Projects grid: featured-by-default filter,
 * keyboard-operable show-all toggle, localized labels, designed fallback,
 * and a stable #projects anchor.
 */

import { fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { ReactNode } from 'react';
import ProjectsGrid from '@/components/ProjectsGrid';
import type { Project } from '@/types/profile';

jest.mock('framer-motion', () => {
  const VNode = ({ children }: { children?: ReactNode }) => <>{children}</>;
  const Div = ({ children, className, id }: { children?: ReactNode; className?: string; id?: string }) => (
    <div id={id} className={className}>
      {children}
    </div>
  );
  return {
    motion: { div: Div, span: VNode, a: VNode, button: VNode },
    AnimatePresence: ({ children }: { children?: ReactNode }) => <>{children}</>,
  };
});

const esT = (key: string) =>
  ({
    'projects.title': 'Proyectos',
    'projects.subtitle': 'Algunos de mis trabajos destacados',
    'projects.featured': 'Destacados',
    'projects.all': 'Todos',
    'projects.badge': 'Destacado',
    'projects.viewDemo': 'Ver Demo',
    'projects.code': 'Código',
  }[key] ?? key);

const enT = (key: string) =>
  ({
    'projects.title': 'Projects',
    'projects.subtitle': 'Some of my featured work',
    'projects.featured': 'Featured',
    'projects.all': 'All',
    'projects.badge': 'Featured',
    'projects.viewDemo': 'View Demo',
    'projects.code': 'Code',
  }[key] ?? key);

const projects: Project[] = [
  {
    id: 'proj-3',
    title: 'iMagiQ',
    description: 'Official authorized Samsung Colombia store.',
    tech: ['React', 'TypeScript'],
    link: 'https://www.imagiq.com/',
    featured: true,
    category: 'client',
    company: 'iMagiQ',
    role: 'Frontend Developer',
    highlights: ['Complete frontend development of the official store'],
  },
  {
    id: 'proj-4',
    title: 'Origination Latam',
    description: 'BTL agency website built end to end.',
    tech: [],
    link: 'https://originationla.com/',
    featured: true,
    category: 'client',
    company: 'Origination Latam',
    role: 'Web Developer',
    highlights: ['Complete construction of the agency website'],
  },
  {
    id: 'proj-1',
    title: 'Portada Real Estate CRM',
    description: 'Custom CRM system for real estate management.',
    tech: ['PHP', 'React', 'MySQL'],
    link: '',
    github: '',
    featured: false,
    category: 'client',
  },
  {
    id: 'proj-2',
    title: 'Muv-u Automation System',
    description: 'Internal process automation tools.',
    tech: ['React', 'Tailwind CSS'],
    link: '',
    github: '',
    featured: false,
    category: 'client',
  },
];

describe('ProjectsGrid', () => {
  it('renders the section anchored at #projects with a localized accessible heading', () => {
    const { container } = render(<ProjectsGrid t={esT} projects={projects} />);
    expect(container.querySelector('section#projects')).not.toBeNull();
    // A section with an accessible name maps to the ARIA 'region' role
    expect(screen.getByRole('region', { name: 'Proyectos' })).toBeInTheDocument();
  });

  it('defaults to featured projects only', () => {
    render(<ProjectsGrid t={esT} projects={projects} />);
    expect(screen.getByText('iMagiQ')).toBeInTheDocument();
    expect(screen.getByText('Origination Latam')).toBeInTheDocument();
    expect(screen.queryByText('Portada Real Estate CRM')).not.toBeInTheDocument();
    expect(screen.queryByText('Muv-u Automation System')).not.toBeInTheDocument();
  });

  it('show-all toggle is a keyboard-operable button that keeps focus and reveals compact projects', () => {
    render(<ProjectsGrid t={esT} projects={projects} />);
    const toggle = screen.getByRole('button', { name: 'Todos' });
    toggle.focus();
    fireEvent.click(toggle);
    expect(screen.getByText('Portada Real Estate CRM')).toBeInTheDocument();
    expect(screen.getByText('Muv-u Automation System')).toBeInTheDocument();
    expect(toggle).toHaveFocus();
  });

  it('renders the filter buttons with localized Spanish labels', () => {
    render(<ProjectsGrid t={esT} projects={projects} />);
    expect(screen.getByRole('button', { name: 'Destacados' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Todos' })).toBeInTheDocument();
  });

  it('renders English filter labels and a Featured badge on the cards', () => {
    render(<ProjectsGrid t={enT} projects={projects} />);
    expect(screen.getByRole('button', { name: 'Featured' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(2);
    expect(within(cards[0]).getByText('Featured')).toBeInTheDocument();
  });

  it('renders designed monogram fallbacks instead of broken images for image-less projects', () => {
    render(<ProjectsGrid t={esT} projects={projects} />);
    expect(screen.getByText('IM')).toBeInTheDocument();
    expect(screen.getByText('OL')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});