/**
 * Configuración de i18next para soporte multilenguaje (Español/Inglés)
 * Este archivo inicializa y configura el sistema de internacionalización de la aplicación
 */

module.exports = {
  i18n: {
    // Idiomas soportados por la aplicación
    locales: ['es', 'en'],
    // Idioma por defecto
    defaultLocale: 'es',
    // Detectar automáticamente el idioma del navegador
    localeDetection: true,
  },
  // Recargar en desarrollo para ver cambios en traducciones
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
