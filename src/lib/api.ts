/**
 * API para cargar datos del perfil profesional
 * Centraliza el acceso a los datos del portafolio
 */

import { Profile } from '@/types/profile';
import profileData from '../../data/profile.json';

/**
 * Obtiene todos los datos del perfil
 * 
 * @returns Datos completos del perfil profesional
 * 
 * @example
 * const profile = await getProfile();
 * console.log(profile.name); // 'Emmanuel Berrio Jiménez'
 */
export async function getProfile(): Promise<Profile> {
  // Simula un delay de API para mejor UX (opcional en producción)
  // await new Promise(resolve => setTimeout(resolve, 100));
  
  return profileData as Profile;
}

/**
 * Obtiene solo la experiencia laboral
 * 
 * @returns Array de experiencias laborales ordenadas por fecha
 */
export async function getExperience() {
  const profile = await getProfile();
  return profile.experience;
}

/**
 * Obtiene solo los proyectos
 * 
 * @param featuredOnly - Si es true, retorna solo proyectos destacados
 * @returns Array de proyectos
 */
export async function getProjects(featuredOnly: boolean = false) {
  const profile = await getProfile();
  return featuredOnly
    ? profile.projects.filter((p) => p.featured)
    : profile.projects;
}

/**
 * Obtiene solo las certificaciones
 * 
 * @returns Array de certificaciones ordenadas por fecha
 */
export async function getCertificates() {
  const profile = await getProfile();
  // Ordenar por fecha (más reciente primero)
  return profile.certificates.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Obtiene solo la educación
 * 
 * @returns Array de educación ordenada por fecha
 */
export async function getEducation() {
  const profile = await getProfile();
  return profile.education;
}

/**
 * Obtiene las habilidades técnicas
 * 
 * @returns Objeto con todas las categorías de habilidades
 */
export async function getSkills() {
  const profile = await getProfile();
  return profile.skills;
}

/**
 * Calcula estadísticas del perfil
 * Útil para mostrar números impactantes en el portafolio
 * 
 * @returns Objeto con estadísticas calculadas
 */
export async function getStats() {
  const profile = await getProfile();
  
  // Calcular años de experiencia (desde la primera experiencia)
  const sortedExperience = [...profile.experience].sort((a, b) => {
    return new Date(a.from).getTime() - new Date(b.from).getTime();
  });
  const firstExperience = sortedExperience[0];
  
  const yearsOfExperience = Math.floor(
    (Date.now() - new Date(firstExperience.from).getTime()) / 
    (1000 * 60 * 60 * 24 * 365)
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
