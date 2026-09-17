/**
 * Tests for profile statistics (computeProfileStats) with a deterministic
 * fixture, plus real-data-plane count assertions.
 */

import { computeProfileStats } from '@/lib/profile/profile.stats';
import { getStatsSync } from '@/lib/api';
import type { Profile } from '@/types/profile';

function makeProfile(overrides: Partial<Profile>): Profile {
  return {
    name: 'Test',
    title: 'Developer',
    summary: 'Summary',
    location: 'Medellín',
    email: 'test@example.com',
    phone: '+57',
    experience: [],
    education: [],
    certificates: [],
    projects: [],
    skills: { frontend: [], backend: [], database: [], tools: [] },
    languages: [],
    references: [],
    social: {},
    ...overrides,
  };
}

describe('computeProfileStats', () => {
  it('counts projects, certificates and technologies from the profile', () => {
    const profile = makeProfile({
      projects: [
        { id: 'p1', title: 'P1', description: 'D', tech: [], featured: false, category: 'client' },
        {
          id: 'p2',
          title: 'P2',
          description: 'D',
          tech: [],
          featured: true,
          category: 'personal',
        },
      ],
      certificates: [{ id: 'c1', name: 'C1', issuer: 'I', date: '2024-01' }],
      skills: {
        frontend: [{ name: 'React', level: 90 }],
        backend: [{ name: 'Node', level: 80 }],
        database: [],
        tools: [
          { name: 'Git', level: 90 },
          { name: 'Docker', level: 70 },
        ],
      },
    });
    const stats = computeProfileStats(profile);
    expect(stats.projectsCompleted).toBe(2);
    expect(stats.certificatesEarned).toBe(1);
    expect(stats.technologiesUsed).toBe(4);
  });

  it('bases years of experience on the earliest entry', () => {
    const early = makeProfile({
      experience: [
        {
          id: 'e1',
          company: 'A',
          title: 'T',
          from: '2000-01',
          to: '2010-01',
          description: 'D',
          achievements: [],
          technologies: [],
        },
      ],
    });
    const recent = makeProfile({
      experience: [
        {
          id: 'e1',
          company: 'A',
          title: 'T',
          from: '2024-01',
          to: 'present',
          description: 'D',
          achievements: [],
          technologies: [],
        },
      ],
    });
    expect(computeProfileStats(early).yearsOfExperience).toBeGreaterThan(
      computeProfileStats(recent).yearsOfExperience
    );
    expect(computeProfileStats(recent).yearsOfExperience).toBeGreaterThanOrEqual(0);
  });

  it('returns 0 years for a profile with no experience', () => {
    const stats = computeProfileStats(makeProfile({}));
    expect(stats.yearsOfExperience).toBe(0);
  });

  it('exposes real data-plane counts (4 projects, 9 certificates)', () => {
    const stats = getStatsSync('es');
    expect(stats.projectsCompleted).toBe(4);
    expect(stats.certificatesEarned).toBe(9);
    expect(stats.technologiesUsed).toBeGreaterThan(0);
  });
});