/**
 * Behavioral tests for the N-item ExperienceTimeline: a vertical spine that
 * renders any number of roles newest-first, the localized CURRENT badge,
 * the corrected Tivenos duration (2026-04 → 2026-10 = 6 months), and empty
 * achievements/technologies rendering no block at all.
 */

import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExperienceTimeline, { sortExperiencesNewestFirst } from '@/components/ExperienceTimeline';
import type { Experience } from '@/types/profile';

const makeExperience = (overrides: Partial<Experience>): Experience => ({
  id: 'exp-x',
  company: 'Company',
  title: 'Role',
  from: '2020-01',
  to: '2020-06',
  description: 'Role description',
  achievements: ['Achievement'],
  technologies: ['Tech'],
  ...overrides,
});

const fiveRoles: Experience[] = [
  makeExperience({
    id: 'exp-1',
    company: 'Botopia',
    title: 'Desarrollador Fullstack',
    from: '2025-04',
    to: '2025-11',
  }),
  makeExperience({
    id: 'exp-2',
    company: 'Muv-u',
    title: 'Programador de Sistemas',
    from: '2023-08',
    to: '2024-01',
  }),
  makeExperience({
    id: 'exp-3',
    company: 'Portada',
    title: 'Programador Full Stack',
    from: '2022-08',
    to: '2023-05',
  }),
  makeExperience({
    id: 'exp-4',
    company: 'TIVENOS',
    title: 'Programador FullStack - Zoho CRM',
    from: '2026-04',
    to: '2026-10',
    current: true,
  }),
  makeExperience({
    id: 'exp-5',
    company: 'Freelance',
    title: 'Programador FullStack',
    from: '2025-12',
    to: '2026-04',
    achievements: [],
    technologies: [],
  }),
];

const esT = (key: string) =>
  ({
    'experience.title': 'Experiencia Laboral',
    'experience.subtitle': 'Mi trayectoria profesional',
    'experience.achievements': 'Logros principales',
    'experience.technologies': 'Tecnologías utilizadas',
    'experience.current': 'Actual',
  }[key] ?? key);

const enT = (key: string) =>
  ({
    'experience.title': 'Work Experience',
    'experience.subtitle': 'My professional journey',
    'experience.achievements': 'Key achievements',
    'experience.technologies': 'Technologies used',
    'experience.current': 'Current',
  }[key] ?? key);

/** EN-translated fixture, mirroring what buildProfile('en') hands the component. */
const fiveRolesEn: Experience[] = fiveRoles.map((role) =>
  role.id === 'exp-4'
    ? { ...role, title: 'FullStack Programmer - Zoho CRM' }
    : role.id === 'exp-5'
      ? { ...role, title: 'FullStack Programmer' }
      : { ...role }
);

/** Direct children of the spine <ol> — the role cards, in visual order. */
const cardItems = (container: HTMLElement): HTMLElement[] =>
  Array.from(container.querySelectorAll('ol > li')) as HTMLElement[];

describe('sortExperiencesNewestFirst', () => {
  it('orders roles newest first by start date', () => {
    const result = sortExperiencesNewestFirst(fiveRoles).map((role) => role.id);
    expect(result).toEqual(['exp-4', 'exp-5', 'exp-1', 'exp-2', 'exp-3']);
  });

  it('breaks ties on equal start dates by id and never mutates the input', () => {
    const equal = [
      makeExperience({ id: 'exp-b', from: '2025-01', to: '2025-06' }),
      makeExperience({ id: 'exp-a', from: '2025-01', to: '2025-06' }),
    ];
    const snapshot = [...equal];
    expect(sortExperiencesNewestFirst(equal).map((role) => role.id)).toEqual(['exp-a', 'exp-b']);
    expect(equal).toEqual(snapshot);
  });
});

describe('ExperienceTimeline', () => {
  it('renders five roles on a single vertical spine in newest-first order', () => {
    const { container } = render(<ExperienceTimeline t={esT} experiences={fiveRoles} locale="es" />);
    const items = cardItems(container);
    expect(items).toHaveLength(5);
    expect(items[0]).toHaveTextContent('TIVENOS');
    expect(items[1]).toHaveTextContent('Freelance');
    expect(items[2]).toHaveTextContent('Botopia');
    expect(items[3]).toHaveTextContent('Muv-u');
    expect(items[4]).toHaveTextContent('Portada');
  });

  it('renders the CURRENT badge next to the Tivenos period with the corrected 6-month duration', () => {
    const { container } = render(<ExperienceTimeline t={esT} experiences={fiveRoles} locale="es" />);
    const tivenos = cardItems(container)[0];
    expect(within(tivenos).getByText('Actual')).toBeInTheDocument();
    // Explicit end date 2026-10 is formatted alongside the start year
    expect(tivenos).toHaveTextContent('2026');
    expect(tivenos).toHaveTextContent('6 meses');
  });

  it('renders EN copy with a Current badge and the 6-months duration', () => {
    const { container } = render(
      <ExperienceTimeline t={enT} experiences={fiveRolesEn} locale="en" />
    );
    const items = cardItems(container);
    expect(items).toHaveLength(5);
    expect(items[0]).toHaveTextContent('FullStack Programmer - Zoho CRM');
    expect(within(items[0]).getByText('Current')).toBeInTheDocument();
    expect(items[0]).toHaveTextContent('6 months');
  });

  it('renders a single role without layout artifacts', () => {
    const { container } = render(
      <ExperienceTimeline t={esT} experiences={[fiveRoles[4]]} locale="es" />
    );
    expect(cardItems(container)).toHaveLength(1);
    expect(screen.getByText('Freelance')).toBeInTheDocument();
  });

  it('renders empty achievements and technologies as no block at all', () => {
    render(<ExperienceTimeline t={esT} experiences={fiveRoles} locale="es" />);
    const freelance = screen.getByText('Freelance').closest('li');
    expect(freelance).not.toBeNull();
    expect(
      within(freelance as HTMLElement).queryByText('Logros principales')
    ).not.toBeInTheDocument();
    const tivenos = screen.getByText('TIVENOS').closest('li');
    expect(within(tivenos as HTMLElement).getByText('Logros principales')).toBeInTheDocument();
  });

  it('renders the current badge on exactly one role', () => {
    render(<ExperienceTimeline t={esT} experiences={fiveRoles} locale="es" />);
    expect(screen.getAllByText('Actual')).toHaveLength(1);
  });

  it('renders all five roles without duplicate-key warnings', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<ExperienceTimeline t={esT} experiences={fiveRoles} locale="es" />);
    const keyWarnings = errorSpy.mock.calls.filter(([message]) =>
      String(message).includes('unique key')
    );
    expect(keyWarnings).toHaveLength(0);
    errorSpy.mockRestore();
  });

  it('exposes the section as an accessible region named by its heading', () => {
    render(<ExperienceTimeline t={esT} experiences={fiveRoles} locale="es" />);
    expect(screen.getByRole('region', { name: 'Experiencia Laboral' })).toBeInTheDocument();
  });
});