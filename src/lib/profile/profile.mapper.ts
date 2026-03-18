import { Profile } from '@/types/profile';
import profileData from '../../../data/profile.json';
import profileI18n from '../../../data/profile-i18n.json';
import { Locale } from './types';

export function buildProfile(locale: Locale = 'es'): Profile {
  const i18nData = profileI18n[locale];

  return {
    ...profileData,
    name: i18nData.name,
    title: i18nData.title,
    summary: i18nData.summary,
    experience: profileData.experience.map((exp) => {
      const i18nExp = i18nData.experience.find((e) => e.id === exp.id);
      return {
        ...exp,
        title: i18nExp?.title || exp.title,
        description: i18nExp?.description || exp.description,
        achievements: i18nExp?.achievements || exp.achievements,
      };
    }),
    education: profileData.education.map((edu) => {
      const i18nEdu = i18nData.education.find((e) => e.id === edu.id);
      return {
        ...edu,
        degree: i18nEdu?.degree || edu.degree,
        field: i18nEdu?.field || edu.field,
        description: i18nEdu?.description || edu.description,
      };
    }),
    projects: profileData.projects.map((proj) => {
      const i18nProj = i18nData.projects.find((p) => p.id === proj.id);
      return {
        ...proj,
        title: i18nProj?.title || proj.title,
        description: i18nProj?.description || proj.description,
        longDescription: i18nProj?.longDescription || proj.longDescription,
      };
    }),
    references: profileData.references.map((ref) => {
      const i18nRef = i18nData.references.find((r) => r.id === ref.id);
      return {
        ...ref,
        title: i18nRef?.title || ref.title,
        company: i18nRef?.company || ref.company,
        relationship: i18nRef?.relationship || ref.relationship,
        recommendation: i18nRef?.recommendation || ref.recommendation,
      };
    }),
  } as Profile;
}
