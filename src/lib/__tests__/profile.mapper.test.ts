/**
 * Tests for the profile data-plane mapper (buildProfile + merge helpers).
 *
 * Covers: Spanish canonical source, English per-field fallback, sparse
 * entries, empty achievements, and an es/en round-trip.
 */

import { buildProfile, mergeEducation, mergeExperience } from '@/lib/profile/profile.mapper';
import type { Education, Experience } from '@/types/profile';
import profileEs from '../../../data/profile.json';

describe('buildProfile — Spanish canonical source', () => {
  it('returns canonical values unchanged for es', () => {
    const profile = buildProfile('es');
    expect(profile.name).toBe(profileEs.name);
    expect(profile.title).toBe(profileEs.title);
    expect(profile.summary).toBe(profileEs.summary);
  });

  it('includes the new TIVENOS entry marked current with an explicit end date', () => {
    const profile = buildProfile('es');
    expect(profile.experience).toHaveLength(5);
    const tivenos = profile.experience.find((exp) => exp.id === 'exp-4');
    expect(tivenos?.company).toBe('TIVENOS - Solutions for Education');
    expect(tivenos?.title).toBe('Programador FullStack - Zoho CRM');
    expect(tivenos?.from).toBe('2026-04');
    expect(tivenos?.to).toBe('2026-10');
    expect(tivenos?.current).toBe(true);
    expect(tivenos?.achievements).toHaveLength(4);
  });

  it('keeps the freelance entry with no invented achievements', () => {
    const profile = buildProfile('es');
    const freelance = profile.experience.find((exp) => exp.id === 'exp-5');
    expect(freelance?.company).toBe('Freelance');
    expect(freelance?.from).toBe('2025-12');
    expect(freelance?.to).toBe('2026-04');
    expect(freelance?.location).toBe('Medellín, Colombia');
    expect(freelance?.achievements).toEqual([]);
  });

  it('features exactly iMagiQ and Origination as client projects', () => {
    const profile = buildProfile('es');
    expect(profile.projects).toHaveLength(4);
    const featuredIds = profile.projects
      .filter((proj) => proj.featured)
      .map((proj) => proj.id)
      .sort();
    expect(featuredIds).toEqual(['proj-3', 'proj-4']);
    const imagiq = profile.projects.find((proj) => proj.id === 'proj-3');
    expect(imagiq?.category).toBe('client');
    expect(imagiq?.link).toBe('https://www.imagiq.com/');
    const origination = profile.projects.find((proj) => proj.id === 'proj-4');
    expect(origination?.category).toBe('client');
    expect(origination?.link).toBe('https://originationla.com/');
    expect(profile.projects.find((proj) => proj.id === 'proj-1')?.featured).toBe(false);
    expect(profile.projects.find((proj) => proj.id === 'proj-2')?.featured).toBe(false);
  });

  it('keeps optional fields absent for sparse entries', () => {
    const imagiq = buildProfile('es').projects.find((proj) => proj.id === 'proj-3');
    expect(imagiq?.github).toBeUndefined();
    expect(imagiq?.image).toBeUndefined();
    expect(imagiq?.period).toBeUndefined();
    expect(imagiq?.title).toBe('iMagiQ');
  });
});

describe('buildProfile — English per-field fallback', () => {
  it('applies complete EN overrides for the new content entries', () => {
    const profile = buildProfile('en');
    const tivenos = profile.experience.find((exp) => exp.id === 'exp-4');
    expect(tivenos?.title).toBe('FullStack Programmer - Zoho CRM');
    expect(tivenos?.description).toContain('Zoho CRM');
    expect(tivenos?.current).toBe(true);
    const freelance = profile.experience.find((exp) => exp.id === 'exp-5');
    expect(freelance?.title).toBe('FullStack Programmer');
    expect(freelance?.achievements).toEqual([]);
    const imagiq = profile.projects.find((proj) => proj.id === 'proj-3');
    expect(imagiq?.description).toContain('Samsung');
    const origination = profile.projects.find((proj) => proj.id === 'proj-4');
    expect(origination?.longDescription).toContain('BTL');
  });

  it('falls back to canonical values for fields without overrides', () => {
    const es = buildProfile('es');
    const en = buildProfile('en');
    // technologies are language-neutral: TIVENOS keeps the canonical stack
    expect(en.experience.find((exp) => exp.id === 'exp-4')?.technologies).toEqual(
      es.experience.find((exp) => exp.id === 'exp-4')?.technologies
    );
    // freelance location is not overridable per contract -> canonical value
    expect(en.experience.find((exp) => exp.id === 'exp-5')?.location).toBe('Medellín, Colombia');
    // pre-existing entries keep their EN copy
    expect(en.experience.find((exp) => exp.id === 'exp-1')?.title).toBe(
      'Fullstack Software Developer'
    );
  });

  it('returns the Spanish entry unchanged when an EN override is missing (merge helper)', () => {
    const base: Experience = {
      id: 'exp-new',
      company: 'Acme',
      title: 'Dev',
      from: '2025-01',
      to: '2025-06',
      description: 'Descripción en español',
      achievements: ['Logro principal'],
      technologies: ['TypeScript'],
    };
    expect(mergeExperience(base, undefined)).toEqual(base);
  });

  it('overrides only the provided fields per entry (merge helper)', () => {
    const base: Experience = {
      id: 'exp-new',
      company: 'Acme',
      title: 'Dev',
      from: '2025-01',
      to: '2025-06',
      description: 'Descripción en español',
      achievements: ['Logro principal'],
      technologies: ['TypeScript'],
    };
    const merged = mergeExperience(base, { title: 'Senior Dev' });
    expect(merged.title).toBe('Senior Dev');
    expect(merged.description).toBe(base.description);
    expect(merged.achievements).toEqual(base.achievements);
    expect(merged.technologies).toEqual(base.technologies);
  });
});

describe('buildProfile — education highlights', () => {
  const esEducation: Education[] = buildProfile('es').education;

  it('ships canonical Spanish highlights for every education entry', () => {
    expect(esEducation).toHaveLength(4);
    esEducation.forEach((edu) => {
      expect(edu.highlights?.length ?? 0).toBeGreaterThan(0);
    });
    expect(esEducation.find((edu) => edu.id === 'edu-4')?.highlights).toHaveLength(3);
  });

  it('replaces highlights with the EN override when the locale provides one', () => {
    const en = buildProfile('en').education;
    const enPascual = en.find((edu) => edu.id === 'edu-1');
    const esPascual = esEducation.find((edu) => edu.id === 'edu-1');
    expect(enPascual?.highlights).toEqual([
      'Programming and logic fundamentals: algorithms, control structures, functions and problem decomposition',
      'Object-Oriented Programming: classes, inheritance, abstraction and encapsulation',
      'Data modeling and relational databases: schema design and SQL queries',
      'Testing and quality assurance: test case design, unit and integration testing, and acceptance criteria',
      'Software engineering: Git version control, team collaboration and project lifecycle under an agile methodology (SCRUM)',
    ]);
    expect(enPascual?.highlights).not.toEqual(esPascual?.highlights);
    expect(enPascual?.description).toContain('Software Development Engineering curriculum');
  });

  it('keeps the canonical Spanish highlights when the override omits them (merge helper)', () => {
    const base: Education = {
      id: 'edu-new',
      institution: 'Acme University',
      degree: 'Ingeniería en Desarrollo de Software',
      field: 'Ingeniería de Software',
      from: '2024-01',
      to: 'present',
      description: 'Descripción en español',
      highlights: ['Álgebra lineal', 'Programación Orientada a Objetos'],
    };
    const merged = mergeEducation(base, {
      degree: 'Software Development Engineering',
      description: 'English description',
    });
    expect(merged.degree).toBe('Software Development Engineering');
    expect(merged.description).toBe('English description');
    expect(merged.highlights).toEqual(base.highlights);
  });

  it('returns the Spanish entry unchanged when an EN override is missing (education merge helper)', () => {
    const base: Education = {
      id: 'edu-new',
      institution: 'Acme University',
      degree: 'Ingeniería en Desarrollo de Software',
      field: 'Ingeniería de Software',
      from: '2024-01',
      to: 'present',
      description: 'Descripción en español',
      highlights: ['Programación'],
    };
    expect(mergeEducation(base, undefined)).toEqual(base);
  });
});

describe('buildProfile — round-trip', () => {
  it('preserves entry parity and new fields across both locales', () => {
    const es = buildProfile('es');
    const en = buildProfile('en');
    expect(en.experience.map((exp) => exp.id)).toEqual(es.experience.map((exp) => exp.id));
    expect(en.projects.map((proj) => proj.id)).toEqual(es.projects.map((proj) => proj.id));
    expect(en.projects.find((proj) => proj.id === 'proj-4')?.featured).toBe(true);
    expect(es.projects.find((proj) => proj.id === 'proj-4')?.category).toBe('client');
  });
});