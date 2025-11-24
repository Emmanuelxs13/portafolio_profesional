/**
 * Componente About (Sobre Mí)
 *
 * Sección que muestra:
 * - Foto profesional o avatar
 * - Descripción detallada del perfil
 * - Estadísticas clave (años de experiencia, proyectos, etc.)
 * - Botón para descargar CV
 * - Animaciones de entrada con Framer Motion
 */

'use client';

import { motion } from 'framer-motion';
import {
  ArrowDownTrayIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';

interface AboutProps {
  /** Diccionario de traducciones */
  t: (key: string) => string;
  /** Descripción/resumen profesional */
  summary: string;
  /** Estadísticas del perfil */
  stats: {
    yearsOfExperience: number;
    projectsCompleted: number;
    certificatesEarned: number;
    technologiesUsed: number;
  };
  /** Idioma actual para descargar CV correspondiente */
  locale: string;
}

/**
 * Variantes de animación para fade-in desde abajo
 */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] as const },
  },
};

/**
 * Variantes para animación de contenedores con stagger
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function About({ t, summary, stats, locale }: Readonly<AboutProps>) {
  /**
   * Estadísticas a mostrar con íconos
   */
  const statisticsData = [
    {
      icon: BriefcaseIcon,
      value: stats.yearsOfExperience,
      label: t('about.yearsExperience'),
      suffix: '+',
    },
    {
      icon: CodeBracketIcon,
      value: stats.projectsCompleted,
      label: t('about.projectsCompleted'),
      suffix: '+',
    },
    {
      icon: AcademicCapIcon,
      value: stats.certificatesEarned,
      label: 'Certificaciones',
      suffix: '',
    },
  ];

  /**
   * Maneja la descarga del CV en el idioma seleccionado
   */
  const handleDownloadCV = () => {
    // La ruta apuntará al endpoint que genera el PDF
    const cvUrl = `/api/cv?lang=${locale}`;

    // Crear un enlace temporal y hacer clic programáticamente
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = `Emmanuel-Berrio-CV-${locale.toUpperCase()}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <section id="about" className="relative py-20 md:py-32 bg-black overflow-hidden">
      {/* Efectos de fondo decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.05 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-500 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Encabezado de sección */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t('about.title')}</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">{t('about.subtitle')}</p>
        </motion.div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Lado izquierdo - Imagen/Avatar */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Fondo decorativo con gradiente */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl transform rotate-6 opacity-20"></div>

              {/* Container de imagen/avatar */}
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border-2 border-gray-700 shadow-2xl">
                {/* Placeholder - Reemplazar con imagen real */}
                <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
                  <span className="text-9xl font-bold text-white opacity-50">EB</span>
                </div>
              </div>

              {/* Badge decorativo */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-6 -right-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg font-semibold"
              >
                ⚡ Available for work
              </motion.div>
            </div>
          </motion.div>

          {/* Lado derecho - Descripción y estadísticas */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="space-y-8"
          >
            {/* Descripción */}
            <motion.div variants={fadeInUp}>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">{summary}</p>
            </motion.div>

            {/* Estadísticas */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {statisticsData.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg"
                >
                  <stat.icon className="h-8 w-8 text-blue-500 mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Botón de descarga de CV */}
            <motion.div variants={fadeInUp}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadCV}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold overflow-hidden shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transition-all duration-300"
              >
                <span className="relative flex items-center gap-2">
                  <ArrowDownTrayIcon className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
                  {t('about.downloadCV')}
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
