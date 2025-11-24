/**
 * Tipos TypeScript para el perfil profesional
 * Define la estructura de datos para toda la información del portafolio
 */

/**
 * Experiencia laboral individual
 */
export interface Experience {
  id: string;
  company: string;
  title: string;
  from: string; // Formato: YYYY-MM
  to: string; // "present" o YYYY-MM
  description: string;
  achievements: string[];
  technologies: string[];
}

/**
 * Educación académica
 */
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  from: string;
  to: string;
  description?: string;
}

/**
 * Certificación o curso
 */
export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string; // Formato: YYYY-MM
  credentialId?: string;
  url?: string;
}

/**
 * Proyecto individual
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  link?: string;
  github?: string;
  image?: string;
  featured: boolean;
}

/**
 * Habilidad técnica con nivel de experiencia
 */
export interface Skill {
  name: string;
  level: number; // 0-100
}

/**
 * Categorías de habilidades
 */
export interface Skills {
  frontend: Skill[];
  backend: Skill[];
  database: Skill[];
  tools: Skill[];
}

/**
 * Idioma con nivel de competencia
 */
export interface Language {
  name: string;
  level: string;
}

/**
 * Referencia profesional
 */
export interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
}

/**
 * Redes sociales
 */
export interface Social {
  linkedin?: string;
  github?: string;
  twitter?: string;
  dev?: string;
}

/**
 * Perfil profesional completo
 */
export interface Profile {
  name: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
  website?: string;
  experience: Experience[];
  education: Education[];
  certificates: Certificate[];
  projects: Project[];
  skills: Skills;
  languages: Language[];
  references: Reference[];
  social: Social;
}
