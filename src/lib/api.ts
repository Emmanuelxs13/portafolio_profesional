/**
 * API para cargar datos del perfil profesional
 * Centraliza el acceso a los datos del portafolio
 */

import { Profile } from '@/types/profile';
import profileData from '../../data/profile.json';
import profileI18n from '../../data/profile-i18n.json';

type Locale = 'es' | 'en';

/**
 * Obtiene todos los datos del perfil
 *
 * @param locale - Idioma del perfil ('es' | 'en')
 * @returns Datos completos del perfil profesional
 *
 * @example
 * const profile = await getProfile('es');
 * console.log(profile.name); // 'Emmanuel Berrio Jiménez'
 */
export async function getProfile(locale: Locale = 'es'): Promise<Profile> {
  // Simula un delay de API para mejor UX (opcional en producción)
  // await new Promise(resolve => setTimeout(resolve, 100));

  // Obtener datos traducidos
  const i18nData = profileI18n[locale];

  // Combinar datos estáticos con datos traducidos
  const profile: Profile = {
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

  return profile;
}

/**
 * Obtiene solo la experiencia laboral
 *
 * @param locale - Idioma del perfil ('es' | 'en')
 * @returns Array de experiencias laborales ordenadas por fecha
 */
export async function getExperience(locale: Locale = 'es') {
  const profile = await getProfile(locale);
  return profile.experience;
}

/**
 * Obtiene solo los proyectos
 *
 * @param locale - Idioma del perfil ('es' | 'en')
 * @param featuredOnly - Si es true, retorna solo proyectos destacados
 * @returns Array de proyectos
 */
export async function getProjects(locale: Locale = 'es', featuredOnly: boolean = false) {
  const profile = await getProfile(locale);
  return featuredOnly ? profile.projects.filter((p) => p.featured) : profile.projects;
}

/**
 * Obtiene solo las certificaciones
 *
 * @param locale - Idioma del perfil ('es' | 'en')
 * @returns Array de certificaciones ordenadas por fecha
 */
export async function getCertificates(locale: Locale = 'es') {
  const profile = await getProfile(locale);
  // Ordenar por fecha (más reciente primero)
  return profile.certificates.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Obtiene solo la educación
 *
 * @param locale - Idioma del perfil ('es' | 'en')
 * @returns Array de educación ordenada por fecha
 */
export async function getEducation(locale: Locale = 'es') {
  const profile = await getProfile(locale);
  return profile.education;
}

/**
 * Obtiene las habilidades técnicas
 *
 * @param locale - Idioma del perfil ('es' | 'en')
 * @returns Objeto con todas las categorías de habilidades
 */
export async function getSkills(locale: Locale = 'es') {
  const profile = await getProfile(locale);
  return profile.skills;
}

/**
 * Calcula estadísticas del perfil
 * Útil para mostrar números impactantes en el portafolio
 *
 * @param locale - Idioma del perfil ('es' | 'en')
 * @returns Objeto con estadísticas calculadas
 */
export async function getStats(locale: Locale = 'es') {
  const profile = await getProfile(locale);

  // Calcular años de experiencia (desde la primera experiencia)
  const sortedExperience = [...profile.experience].sort((a, b) => {
    return new Date(a.from).getTime() - new Date(b.from).getTime();
  });
  const firstExperience = sortedExperience[0];

  const yearsOfExperience = Math.floor(
    (Date.now() - new Date(firstExperience.from).getTime()) / (1000 * 60 * 60 * 24 * 365)
  );

  return {
    yearsOfExperience,
    projectsCompleted: profile.projects.length,
    certificatesEarned: profile.certificates.length,
    technologiesUsed: [
      ...profile.skills.frontend,
      ...profile.skills.backend,
      ...profile.skills.database,
      ...profile.skills.tools,
    ].length,
  };
}
