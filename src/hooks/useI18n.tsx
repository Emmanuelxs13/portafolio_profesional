/**
 * Hook personalizado para internacionalización (i18n)
 */

'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type Locale = 'es' | 'en';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Traducciones inline simplificadas
const translations: Record<Locale, Record<string, string>> = {
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Sobre mí',
    'nav.experience': 'Experiencia',
    'nav.projects': 'Proyectos',
    'nav.certificates': 'Certificaciones',
    'nav.contact': 'Contacto',
    'hero.greeting': 'Hola, soy',
    'hero.title': 'Desarrollador Full-Stack',
    'hero.subtitle': 'Creando experiencias web excepcionales',
    'hero.cta': 'Ver mi trabajo',
    'hero.ctaSecondary': 'Contáctame',
    'about.title': 'Sobre mí',
    'about.subtitle': 'Conoce un poco más sobre mi trayectoria',
    'about.downloadCV': 'Descargar CV',
    'about.yearsExperience': 'Años de experiencia',
    'about.projectsCompleted': 'Proyectos completados',
    'experience.title': 'Experiencia Laboral',
    'experience.subtitle': 'Mi trayectoria profesional',
    'experience.achievements': 'Logros principales',
    'experience.technologies': 'Tecnologías utilizadas',
    'projects.title': 'Proyectos',
    'projects.subtitle': 'Algunos de mis trabajos destacados',
    'projects.featured': 'Destacados',
    'projects.all': 'Todos',
    'certificates.title': 'Certificaciones',
    'certificates.subtitle': 'Certificaciones y cursos completados',
    'certificates.viewCredential': 'Ver credencial',
    'contact.title': 'Contacto',
    'contact.subtitle': '¿Tienes un proyecto en mente? ¡Hablemos!',
    'contact.form.name': 'Nombre',
    'contact.form.namePlaceholder': 'Tu nombre completo',
    'contact.form.email': 'Email',
    'contact.form.emailPlaceholder': 'tu@email.com',
    'contact.form.subject': 'Asunto',
    'contact.form.subjectPlaceholder': '¿En qué puedo ayudarte?',
    'contact.form.message': 'Mensaje',
    'contact.form.messagePlaceholder': 'Cuéntame sobre tu proyecto...',
    'contact.form.consent': 'Acepto la política de privacidad',
    'contact.form.submit': 'Enviar mensaje',
    'contact.form.sending': 'Enviando...',
    'contact.success.message': '¡Mensaje enviado! Te responderé pronto.',
    'contact.error.message': 'Error al enviar. Intenta de nuevo.',
    'footer.rights': 'Todos los derechos reservados',
    'footer.privacy': 'Política de privacidad',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.certificates': 'Certificates',
    'nav.contact': 'Contact',
    'hero.greeting': 'Hi, I\'m',
    'hero.title': 'Full-Stack Developer',
    'hero.subtitle': 'Building exceptional web experiences',
    'hero.cta': 'View my work',
    'hero.ctaSecondary': 'Contact me',
    'about.title': 'About Me',
    'about.subtitle': 'Learn more about my background',
    'about.downloadCV': 'Download CV',
    'about.yearsExperience': 'Years of experience',
    'about.projectsCompleted': 'Projects completed',
    'experience.title': 'Work Experience',
    'experience.subtitle': 'My professional journey',
    'experience.achievements': 'Key achievements',
    'experience.technologies': 'Technologies used',
    'projects.title': 'Projects',
    'projects.subtitle': 'Some of my featured work',
    'projects.featured': 'Featured',
    'projects.all': 'All',
    'certificates.title': 'Certifications',
    'certificates.subtitle': 'Completed certifications and courses',
    'certificates.viewCredential': 'View credential',
    'contact.title': 'Contact',
    'contact.subtitle': 'Have a project in mind? Let\'s talk!',
    'contact.form.name': 'Name',
    'contact.form.namePlaceholder': 'Your full name',
    'contact.form.email': 'Email',
    'contact.form.emailPlaceholder': 'your@email.com',
    'contact.form.subject': 'Subject',
    'contact.form.subjectPlaceholder': 'How can I help you?',
    'contact.form.message': 'Message',
    'contact.form.messagePlaceholder': 'Tell me about your project...',
    'contact.form.consent': 'I accept the privacy policy',
    'contact.form.submit': 'Send message',
    'contact.form.sending': 'Sending...',
    'contact.success.message': 'Message sent! I\'ll get back to you soon.',
    'contact.error.message': 'Error sending. Please try again.',
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy policy',
  },
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('es');

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    // Guardar preferencia en localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[locale][key] || key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
