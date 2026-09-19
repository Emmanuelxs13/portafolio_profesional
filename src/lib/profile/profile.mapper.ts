/**
 * Mapper that builds a typed Profile from the canonical Spanish source
 * (data/profile.json) plus per-locale, per-field overrides
 * (data/profile-i18n.json).
 *
 * Spanish is canonical: every value comes from profile.json unchanged.
 * For English, each entry falls back to the canonical value for any field
 * without an override, so each content entry has at most two edit points.
 */

import { Profile, Experience, Project, Education, Reference } from '@/types/profile';
import profileData from '../../../data/profile.json';
import profileI18nFile from '../../../data/profile-i18n.json';
import { Locale } from './types';

interface ExperienceOverride {
  id: string;
  company?: string;
  title?: string;
  description?: string;
  achievements?: string[];
}

interface ProjectOverride {
  id: string;
  title?: string;
  description?: string;
  longDescription?: string;
  role?: string;
  highlights?: string[];
  outcome?: string;
}

interface EducationOverride {
  id: string;
  degree?: string;
  field?: string;
  description?: string;
}

interface ReferenceOverride {
  id: string;
  title?: string;
  company?: string;
  relationship?: string;
  recommendation?: string;
}

interface ProfileI18nFile {
  en?: {
    name?: string;
    title?: string;
    summary?: string;
    experience?: ExperienceOverride[];
    education?: EducationOverride[];
    projects?: ProjectOverride[];
    references?: ReferenceOverride[];
  };
}

const profileI18n = profileI18nFile as ProfileI18nFile;

export function mergeExperience(base: Experience, override?: Partial<Experience>): Experience {
  if (!override) return base;
  return {
    ...base,
    ...(override.company !== undefined ? { company: override.company } : {}),
    ...(override.title !== undefined ? { title: override.title } : {}),
    ...(override.description !== undefined ? { description: override.description } : {}),
    ...(override.achievements !== undefined ? { achievements: override.achievements } : {}),
  };
}

export function mergeProject(base: Project, override?: Partial<Project>): Project {
  if (!override) return base;
  return {
    ...base,
    ...(override.title !== undefined ? { title: override.title } : {}),
    ...(override.description !== undefined ? { description: override.description } : {}),
    ...(override.longDescription !== undefined ? { longDescription: override.longDescription } : {}),
    ...(override.role !== undefined ? { role: override.role } : {}),
    ...(override.highlights !== undefined ? { highlights: override.highlights } : {}),
    ...(override.outcome !== undefined ? { outcome: override.outcome } : {}),
  };
}

function mergeEducation(base: Education, override?: Partial<Education>): Education {
  if (!override) return base;
  return {
    ...base,
    ...(override.degree !== undefined ? { degree: override.degree } : {}),
    ...(override.field !== undefined ? { field: override.field } : {}),
    ...(override.description !== undefined ? { description: override.description } : {}),
  };
}

function mergeReference(base: Reference, override?: Partial<Reference>): Reference {
  if (!override) return base;
  return {
    ...base,
    ...(override.title !== undefined ? { title: override.title } : {}),
    ...(override.company !== undefined ? { company: override.company } : {}),
    ...(override.relationship !== undefined ? { relationship: override.relationship } : {}),
    ...(override.recommendation !== undefined ? { recommendation: override.recommendation } : {}),
  };
}

export function buildProfile(locale: Locale = 'es'): Profile {
  if (locale === 'es' || !profileI18n.en) {
    return { ...profileData } as Profile;
  }

  const i18n = profileI18n.en;

  return {
    ...profileData,
    name: i18n.name || profileData.name,
    title: i18n.title || profileData.title,
    summary: i18n.summary || profileData.summary,
    experience: (profileData.experience as Experience[]).map((exp) =>
      mergeExperience(exp, i18n.experience?.find((e) => e.id === exp.id))
    ),
    education: (profileData.education as Education[]).map((edu) =>
      mergeEducation(edu, i18n.education?.find((e) => e.id === edu.id))
    ),
    projects: (profileData.projects as Project[]).map((proj) =>
      mergeProject(proj, i18n.projects?.find((p) => p.id === proj.id))
    ),
    references: (profileData.references as Reference[]).map((ref) =>
      mergeReference(ref, i18n.references?.find((r) => r.id === ref.id))
    ),
  } as Profile;
}