/**
 * API para cargar datos del perfil profesional
 * Centraliza el acceso a los datos del portafolio
 */

import { Profile } from '@/types/profile';
import { buildProfile } from '@/lib/profile/profile.mapper';
import { computeProfileStats } from '@/lib/profile/profile.stats';
import { Locale, ProfileStats } from '@/lib/profile/types';

export function getProfileSync(locale: Locale = 'es'): Profile {
  return buildProfile(locale);
}

export function getStatsSync(locale: Locale = 'es'): ProfileStats {
  return computeProfileStats(buildProfile(locale));
}

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
  return buildProfile(locale);
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
  return computeProfileStats(await getProfile(locale));
}
